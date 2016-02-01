# from xml.dom import minidom
# xmldoc = minidom.parse('Guns-N-Roses-Sweet-Child-O-Mine-Pro.xml')
# itemlist = xmldoc.getElementsByTagName('string')
# print(len(itemlist))
# print(itemlist[1].childNodes[0].nodeValue)
#  for s in itemlist:
#      print(s.childNodes[0].nodeValue)

# <technical>
#    <fret>14</fret>
#    <string>3</string>
# </technical>
# <pitch>
#   <step>G</step>
#   <alter>1</alter>
#   <octave>4</octave>
# </pitch>

import xml.etree.ElementTree as ET #this method  using tree structure to catch XML tag 
tree = ET.parse('Guns-N-Roses-Sweet-Child-O-Mine-Pro2.xml')
root = tree.getroot()#get the root tag , in this XML is 'score-partwise'
for child in root:
   print child.tag, child.attrib
i = 1
for note in root.findall('./part/measure/note'):#if you want to using some tag then you need to get the parent node first
	
	pitch = note.find('pitch')	#do something to child node
	if  pitch is None: #compare does this tag in the child node
		pass
	else:
		step = pitch.find('step')
		if  step is None:
			pass
		else:
			step = step.text
	
		alter = pitch.find('alter')
		if  alter is None:
			pass
		else:
			alter = alter.text
		octave = pitch.find('octave').text
		print step, alter, octave ,i
		i = i+1
	pass



for technical in root.findall('./part/measure/note/notations/technical'):
   fret = technical.find('fret').text
   print fret



