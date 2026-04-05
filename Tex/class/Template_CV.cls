%----------------------------------------------------------------------------------------
%	CLASS CONFIGURATION
%----------------------------------------------------------------------------------------
\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{class/Template_CV}[2020/07/30 Template - CV v1.0]

\DeclareOption*{\PassOptionsToClass{\CurrentOption}{extarticle}} 
\ProcessOptions\relax 

\LoadClass{extarticle} 

%----------------------------------------------------------------------------------------
%	Load External Packages
%----------------------------------------------------------------------------------------
%\usepackage{fontawesome} 	%icons
\usepackage{fontawesome5}
\usepackage{xpatch} 		%patch header function
\usepackage{ifthen} 		%ifthenelse function
\usepackage{xcolor} 		%color settings
\usepackage{graphicx} 		%load graphics
\graphicspath{ {images/} }	%folder path
\usepackage{graphics}
\usepackage{adjustbox}
\usepackage{geometry} 		%document margins, headers etc.
\usepackage{fancyhdr} 		%new header / footer package
\usepackage{array}			%For creating tables
\usepackage{multicol}		%multiple columns in same table
\usepackage{multirow}		%multiple rows in same table
\usepackage{scrextend}		%add margins to text
\usepackage[none]{hyphenat}	%no hyphenation
\usepackage{ragged2e}		%add raggedleft functions
\usepackage{enumitem}		%table enum fix
\RequirePackage{dashrule}	%dash rule lines
\usepackage{tikz} 			% Required for creating the plots
\usetikzlibrary{shapes, backgrounds}
\tikzset{x=1cm, y=1cm} 		% Default tikz units
\usepackage{colortbl}		%color table lines
\usepackage{supertabular,enumitem}


%----------------------------------------------------------------------------------------
%	Load Dependencies
%----------------------------------------------------------------------------------------
\input{fonts/fontsettings.tex}
\input{styles/material_colors.tex}
\input{styles/textstyles.tex}
\input{styles/pagesettings.tex}

%----------------------------------------------------------------------------------------
%	Load Components
%----------------------------------------------------------------------------------------
\input{components/chart_bubble.tex}
\input{components/chart_HorizontalBar.tex}
\input{components/chart_verticalcentrebox.tex}
\input{components/CVheader.tex}
\input{components/CVsectionstyles.tex}

%Table Formats
\setlength{\arrayrulewidth}{0.3mm}
\setlength{\tabcolsep}{8pt}
\renewcommand{\arraystretch}{1.25}

%List Formats
\renewcommand{\@listI}{
\leftmargin=10pt
%\rightmargin=0pt
%\labelsep=0pt
%\labelwidth=0pt
%\itemindent=5pt
%\listparindent=5pt
\topsep=2pt 
\partopsep=0pt 
\parsep=0pt
\parskip=0pt
\itemsep=3pt
}