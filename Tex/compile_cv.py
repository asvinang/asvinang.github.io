import subprocess
import shutil
import sys
from datetime import date
from pathlib import Path

TEX_DIR = Path(__file__).parent
OUT_DIR = TEX_DIR / "CV"
OUT_DIR.mkdir(exist_ok=True)

TODAY = date.today().strftime("%Y-%m-%d")

CVS = {
    "CV_Extended": f"Asvin_Ang_CV_Extended_{TODAY}.pdf",
    "CV_Short":    f"Asvin_Ang_CV_Short_{TODAY}.pdf",
}

def compile_tex(tex_name):
    print(f"\nCompiling {tex_name}.tex ...")
    result = subprocess.run(
        ["pdflatex", "-interaction=nonstopmode", f"{tex_name}.tex"],
        cwd=TEX_DIR,
        capture_output=True,
        text=True,
    )
    # Run twice for references/longtable
    subprocess.run(
        ["pdflatex", "-interaction=nonstopmode", f"{tex_name}.tex"],
        cwd=TEX_DIR,
        capture_output=True,
        text=True,
    )
    if result.returncode != 0 and "Output written" not in result.stdout:
        print(f"  ERROR: {tex_name} failed to compile.")
        print(result.stdout[-2000:])
        return False
    print(f"  OK")
    return True

FIXED = {
    "CV_Extended": "Asvin_Ang_CV_Extended.pdf",
    "CV_Short":    "Asvin_Ang_CV_Short.pdf",
}

errors = []
for tex_name, out_name in CVS.items():
    if compile_tex(tex_name):
        src = TEX_DIR / f"{tex_name}.pdf"
        dst = OUT_DIR / out_name
        shutil.copy2(src, dst)
        print(f"  Saved -> CV/{out_name}")
        # Also copy to fixed filename for website links
        fixed_dst = OUT_DIR / FIXED[tex_name]
        shutil.copy2(src, fixed_dst)
        print(f"  Saved -> CV/{FIXED[tex_name]}")
    else:
        errors.append(tex_name)

print()
if errors:
    print(f"Failed: {', '.join(errors)}")
    sys.exit(1)
else:
    print("Both CVs compiled and saved to CV/")
