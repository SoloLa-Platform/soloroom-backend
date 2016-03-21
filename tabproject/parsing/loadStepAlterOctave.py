import xml.etree.ElementTree as ET #this method  using tree structure to catch XML tag 

# The excution flow is as following:
# 1. Add the 4 type of guitar techinque: (bend, hammer/pull-off, slide, vibrato)
# 2. Convert XML to JSON

# exmaple_tux_guiatr.xml is plain music note without tech. note
tree = ET.parse('exmaple_tux_guitar.xml')
root = tree.getroot()#get the root tag , in this XML is 'score-partwise'


for child in root:
   print child.tag, child.attrib
i = 1
# for note in root.findall('./part/measure/note'):#if you want to using some tag then you need to get the parent node first
	
# 	pitch = note.find('pitch')	#do something to child node
# 	if  pitch is None: #compare does this tag in the child node
# 		pass
# 	else:
# 		step = pitch.find('step')
# 		if  step is None:
# 			pass
# 		else:
# 			step = step.text
	
# 		alter = pitch.find('alter')
# 		if  alter is None:
# 			pass
# 		else:
# 			alter = alter.text
# 		octave = pitch.find('octave').text
# 		print step, alter, octave ,i
# 		i = i+1
# 	pass



# for technical in root.findall('./part/measure/note/notations/technical'):
#    fret = technical.find('fret').text
#    print fret



