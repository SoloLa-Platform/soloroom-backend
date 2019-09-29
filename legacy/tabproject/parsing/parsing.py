# import musicxml_lib.tagOpera as tagOp
import xml.etree.ElementTree as et
import json
import xmltodict
from parser.parser import Tab

# The excution flow is as following:
# 1. Add the 4 type of guitar techinque: (bend, hammer/pull-off, slide, vibrato)
# 2. Convert XML to JSON

beat_file = "../data/lick_13/S0.Beat/lick_13.beat"
downbeat_file = "../data/lick_13/S0.Beat/lick_13.downbeat"
esn_file = "../data/lick_13/S4.ExpressionStyle/lick_13.esn"
fingering_file = "../data/lick_13/S5.Fingering/lick_13.fingering"

t = Tab()
t.createXMLTemplate()
t.parseNoteTech(esn_file, fingering_file, downbeat_file, beat_file)
t.dump()
t.write2XML("../data/lick_13.xml")
t.convert2JSON("../data//lick_13.xml", "../data/lick_13.json")
# convert musicXML to JSON



# exmaple_tux_guiatr.xml is plain music note without tech. note
# tree = et.parse('exmaple_tux_guitar.xml')
# root = tree.getroot()#get the root tag , in this XML is 'score-partwise'

# # Retrive song info. ( the rest of <part>)
# dinfo =  { child.tag:child for child in root if child.tag != 'part'}
# # print dinfo

# # Remove info data
# root.remove(root.find('movement-title'))
# root.remove(root.find('identification'))
# root.remove(root.find('part-list'))


# # Retrviv the id of <part>, measure of song
# dpart = { child.attrib['id']:child for child in root if child.tag == 'part'}
# firstAttr= dpart['p0'].findall("measure[@number='1']/attributes/*")

# # Check Attribute and collect the unique one

# prevElem = None;
# for elem in root.findall("./part/measure"):


# 	number = int(elem.attrib['number'])
# 	# try remove redundant attribute
# 	# if number != 1:
# 	print elem.find("attributes/staves").text
# 	print elem.find("attributes/clef/sign").text
# 	print elem.find("attributes/clef/line").text
# 	print (elem.find("attributes/clef"))
# 	print (elem.find("attributes/staff-details"))

# 	# if elem.find("direction") is not None:
# 	# 	elem.remove(elem.find("direction"))


# Delete the all the other measture/attr except first object
# fmid = "output.xml"
# for elem in root.findall("./part/measure"):

# 	number = int(elem.attrib['number'])
# 	# try remove redundant attribute
# 	if number != 1:
# 		elem.remove(elem.find("attributes/key"))
# 		elem.remove(elem.find("attributes/staves"))
# 		elem.remove(elem.find("attributes/clef"))
# 		elem.remove(elem.find("attributes/staff-details"))

# 	if elem.find("direction") is not None:
# 		elem.remove(elem.find("direction"))

# parser = etree.XMLParser(remove_blank_text=True)
# elem = etree.XML(xml_str, parser=parser)
# print etree.tostring(elem)

# tree.write(fmid)

# # convert musicXML to JSON
# with open(fmid, 'r') as xmlFile:
# 	data = xmlFile.read()
# fout = "output.json"
# with open(fout, 'w') as jsonFile:
# 	jsonFile.write(json.dumps(xmltodict.parse(data), indent=4))

