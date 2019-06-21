def content(path):
    import os 
    htmlcontent = '' 

    root = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))

    htmlcontent = htmlcontent + '<div class="header">'
    htmlcontent = htmlcontent + '   <div class="container-flex bg-black">'
    #htmlcontent = htmlcontent + '       <div class="container">'
    htmlcontent = htmlcontent + '           <nav class="navbar navbar-expand-lg bg-black">'
    htmlcontent = htmlcontent + '               <a class="navbar-brand' + (" active" if path == "/" else "") + '" href="/">HOME</a>'
    htmlcontent = htmlcontent + '           	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">'
    htmlcontent = htmlcontent + '           		<div class="burger-line"></div>'
    htmlcontent = htmlcontent + '           		<div class="burger-line"></div>'
    htmlcontent = htmlcontent + '           		<div class="burger-line"></div>'
    htmlcontent = htmlcontent + '           	</button>'
    htmlcontent = htmlcontent + '           <div class="collapse navbar-collapse" id="navbarSupportedContent"><ul class="navbar-nav mr-auto">'
    
    for filename in os.listdir(root + "/pages"):
        if filename.endswith(".py"): 
            filename = filename[:-3]
            htmlcontent = htmlcontent + '<li class="nav-item' + (" active" if filename == path[1:] else "") + '"><a class="nav-link" href="/'+ filename +'">' + filename + '<span class="sr-only"></span></a></li>'    
    
    htmlcontent = htmlcontent + '</ul></div></nav></div></div>'
    #htmlcontent = htmlcontent + '</div>'

    return htmlcontent
