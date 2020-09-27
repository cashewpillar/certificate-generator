# Certificate Generator
Web application for generating certificates from a list of names (file formats: .xlsx .csv .tsv .json)

## Wireframe Design
![Wireframe-1](https://github.com/yulyen/certificate_generator/blob/LAdevelop/wireframe.png)
#### ---------------------------------------------------------------------------------------------------------------------
![Wireframe-2](https://github.com/yulyen/certificate_generator/blob/LAdevelop/wireframe-2.png)





## TO DO
1. Hide edit-certificate button, show only when the user has supplied the certificate template and the certificate image

#### I. Edit-Certificate
1. Setup font family setting
2. Setup font style setting
3. When all names are removed, restore default settings for certificate name text (global variables, i.e. window.font_family)
4. If changes are made in the editing box (window/ modal), and the user clicks at the background or at the close button, prompt for confirmation 

*messy additional info
- '#edit-certificate.modal': #apply-changes.button
    --> run generatePreview for both previews using window.width_and_height_of_template
    --> open modal  -> make changes, save   -> store current h and v values to window.edit_h_val and etc.
                    -> make changes, cancel -> revert to previous state, the preview and check if the other one also needs -> if previous state is from default (generatePreview), run generatePreview for both edit-cert modal AND card2 w/ the function only differing in the imgSelector parameter
                                                                        ->aasaksjaksaa if previous state is from saved (if global variables for edit_v_and_h are present), run generatePreview for both preview using the stored window.edit-h-and-v variables to generate previews, each w/ diff imgSelector param


#### II. Generate Certificates
1. Upon #generate.button click: 
    --> call function for generating high quality certificates, using the global variables for the text styling
