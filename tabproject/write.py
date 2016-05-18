import xml.etree.ElementTree as ET #this method  using tree structure to catch XML tag 
tree = ET.parse('Guns-N-Roses-Sweet-Child-O-Mine-Pro2.xml')
root = tree.getroot()#get the root tag , in this XML is 'score-partwise'

note = root.find('./part/measure/note')
pitch = note.find('pitch')	
new=ET.SubElement(pitch, 'new')
new.text='abc'
ET.dump(pitch)
tree.write('Guns-N-Roses-Sweet-Child-O-Mine-Pro2.xml')