lastline = None
for line in open("file.txt", "r"):
    lastline = line
with open("file.txt", "r") as inputfile:
    with open("country_data.json", "w") as outputfile:
        outputfile.write("[ \n")


        for line in inputfile:
            currentObj = line.split(":")
            code = currentObj[0].replace('   ', '')
            name = currentObj[1].replace(',', '').replace('\n', '') #remove commas
            newcode = "\"code\":" + code
            newname = "\"name\":" + name
            s = name.split('"')
            link = "\"link\" : " + "\"" + s[1].replace(' ', '_') + "\""
            outputfile.write("\t{" + newcode + ", " + newname + ", " + link + "}")
            if line != lastline:
                outputfile.write(",\n")
        outputfile.write("\n]")