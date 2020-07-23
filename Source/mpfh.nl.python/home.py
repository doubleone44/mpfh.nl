def content():
    import os 
    dir_path = os.path.dirname(os.path.realpath(__file__))

    try:
        with open(dir_path + '/home.html', 'r') as file:
            return file.read()
    except Exception as exception:
        return exception