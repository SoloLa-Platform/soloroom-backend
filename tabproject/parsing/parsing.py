import musicxml_lib.tagOpera as tagOp
import xml.etree.ElementTree as et
import json
import xmltodict

# The excution flow is as following:
# 1. Add the 4 type of guitar techinque: (bend, hammer/pull-off, slide, vibrato)
# 2. Convert XML to JSON

# exmaple_tux_guiatr.xml is plain music note without tech. note
tree = et.parse('exmaple_tux_guitar.xml')
root = tree.getroot()#get the root tag , in this XML is 'score-partwise'

# Retrive song info. ( the rest of <part>)
dinfo =  { child.tag:child for child in root if child.tag != 'part'}
# print dinfo

# Remove info data
root.remove(root.find('movement-title'))
root.remove(root.find('identification'))
root.remove(root.find('part-list'))


# Retrviv the id of <part>, measure of song
dpart = { child.attrib['id']:child for child in root if child.tag == 'part'}
firstAttr= dpart['p0'].findall("measure[@number='1']/attributes/*")

# Delete the all the other measture/attr except first object
fmid = "output.xml"
for elem in root.findall("./part/measure"):

	number = int(elem.attrib['number'])
	if number != 1:
		elem.remove(elem.find("attributes"))
	if elem.find("direction") is not None:
		elem.remove(elem.find("direction"))

tree.write(fmid)

# convert musicXML to JSON
with open(fmid, 'r') as xmlFile:
	data = xmlFile.read()
fout = "output.json"
with open(fout, 'w') as jsonFile:
	jsonFile.write(json.dumps(xmltodict.parse(data), indent=4))

