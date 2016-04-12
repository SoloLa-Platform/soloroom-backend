from lxml import etree

# Tab is a Class to handle customized MusicXML with lxml etree
# Features: add tag value and create  tag, guitar tech tag, for usage
#			Able to handle the musicXML data imported from guitar pro
#			, tux guitar and other tab editor
class Tab:

	# MusicXML pre-define Parent Tag
	root = "score-partwise"
	childList = ["movement-title", "identification", "part-list", "part"]
	# Object to store tab tree
	root;

	def __init__ (self,  ):
	# init the basic parent tag of musicXML
		pass
	def parseExistedXML(self, xmlPath):
		pass
	def createNewXML(self):
		self.root = etree.Element(self.root)

		#
		# add pre-define info. for xml
		#
		for c in self.childList:
			self.root.append(etree.Element(c))

		# identification
		en = etree.SubElement(self.root[1],"encoding")
		so = etree.SubElement(en,"software")
		so.text = "SoloLa-Backend"

		# part-list
		sc = etree.SubElement(self.root[1],"score-part")
		sc.attrib['id'] = "p0"
		pa = etree.SubElement(sc,"part-name")
		pa.text = "Lead Guitar (Robot)"

		# part
		self.root[3].attrib['id'] = "p0"

	def dump(self):
		print etree.tostring(self.root, pretty_print=True)
