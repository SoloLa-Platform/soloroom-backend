from lxml import etree
import json
import xmltodict

# Tab is a Class to handle customized MusicXML with lxml etree
# Features: add tag value and create  tag, guitar tech tag, for usage
#			Able to handle the musicXML data imported from guitar pro
#			, tux guitar and other tab editor
# Input:
#	1 .esn (for tech. & note)
#   2 .beat (file bar beat)
#   3 .fingering (for fret and line)

class Tab:


	def __init__ (self ):
		# MusicXML pre-define Parent Tag
		self.root = "score-partwise"
		self.childList = ["movement-title", "identification", "part-list", "part"]
		# Object to store tab tree
		self.rootNode = None;
		pass
	def parseExistedXML(self, xmlPath):
		pass
	def createXMLTemplate(self):
		self.rootNode = etree.Element(self.root)

		#
		# add pre-define info. for xml
		#
		for c in self.childList:
			self.rootNode.append(etree.Element(c))

		# identification
		en = etree.SubElement(self.rootNode[1],"encoding")
		so = etree.SubElement(en,"software")
		so.text = "SoloLa-Backend"

		# part-list
		sc = etree.SubElement(self.rootNode[1],"score-part")
		sc.attrib['id'] = "p0"
		pa = etree.SubElement(sc,"part-name")
		pa.text = "Lead Guitar (Robot)"

		# part
		self.rootNode[3].attrib['id'] = "p0"
	def parse(self):
		pass

	def parseBeat( self, beat_file ):

		fp = open(beat_file, "r")
		for line in fp:
			beats = etree.SubElement(self.rootNode[3][idx], "beats")
			b = etree.SubElement(self.rootNode[3], "beat")
			# Beat Onset
			b_onest = etree.SubElement(b, "onset")
			b_onest.text = line.split(" ")[0].replace('\n','')

			# Beat Value
			b_value = etree.SubElement(b, "value")
			b_value.text = line.split(" ")[1].replace('\n','')
		pass
	def parseNoteTech( self, esn_file, fingering_file, downbeat_file, beat_file ):


		f_db = open(downbeat_file, "r")

		# Insert heading timing point
		list_db = [ 0 ]

		# Create Measure (Bar)
		for idx, l in enumerate(f_db):
			list_db.append( float(l.split(" ")[0]) )
			m = etree.SubElement(self.rootNode[3], "measure")
			m.attrib['number'] = "{}".format(idx+1)

		# fingering_file format
		# String | Fret
		# 0        1
		fp = open(fingering_file, "r")
		# esn_file format
		# Name  |  Pitch |Onset | Duration| PreBend | Bend | Release|
		# Index |  0      1       2         3         4      5
		#
		#  Pull-off | Hammer-on | legato slide | Slide In | Slide Out | Vibrato
		#  6          7           8              9          10          11
		fp2 = open(esn_file, "r")
		dict_esn_name = { 	0: "pitch",
							1: "onset",
							2: "duration",
							3: "prebend",
							4: "bend",
							5: "release",
							6: "pullOff",
							7: "hammerOn",
							8: "legatoSlide",
							9: "slideIn",
							10: "slideOut",
							11: "vibrato"	}
		# Insert Note & Tech
		for l, l2 in zip(fp, fp2):

			list_finger = l.split(" ")
			list_finger[1] = list_finger[1].replace('\n','')

			list_esn = l2.split(" ")
			list_esn[11] = list_esn[11].replace('\n', '')

			# print "onset:{}, index:{}".format( list_esn[1], self.findBelongMeasureIndex(list_esn[1], list_db))
			idx = self.findBelongMeasureIndex(list_esn[1], list_db)
			# Create Note
			n = etree.SubElement(self.rootNode[3][idx], "note")

			# Picth
			pitch = etree.SubElement(n, "pitch")
			freq = etree.SubElement(pitch, "freq")
			freq.text = list_esn[0]

			# Onset
			onset = etree.SubElement(n, "onset")
			onset.text = list_esn[1]
			# Duration
			dur = etree.SubElement(n, "duration")
			dur.text =  list_esn[2]

			# Notation - Fret & String
			nota = etree.SubElement(n, "notations")
			string = etree.SubElement(nota, "string")
			string.text = list_finger[0]
			fret = etree.SubElement(nota, "fret")
			fret.text = list_finger[1]

			# Tech (index: 3~11)
			tech = etree.SubElement(n, "technical")
			for i in range(4,12):
				if float(list_esn[i]) != 0.0:
					t = etree.SubElement(tech, dict_esn_name[i])
					t.text = list_esn[i]


		# === Insert Beats (unfinish) ===
		fp = open(beat_file, "r")
		# Name  | onset | value
		# Index | 0     | 1
		for line in fp:
			onset = line.split(" ")[0]
			v = line.split(" ")[1].replace('\n','')

			idx = self.findBelongMeasureIndex(onset, list_db)
			b = etree.SubElement(self.rootNode[3][idx], "beat")

			# Beat Onset
			b_onest = etree.SubElement(b, "onset")
			b_onest.text = onset

			# Beat Value
			b_value = etree.SubElement(b, "value")
			b_value.text = v
		pass
	def findBelongMeasureIndex(self, onset, db_list ):
		belongIndex = -1
		# loop until second from the bottom
		for i in range(0, len(db_list)-1):
			# print "[s:e]: {} ~ {}".format(db_list[i], db_list[i+1])
			if float(onset) >= db_list[i] and float(onset) <= db_list[i+1]:
				belongIndex = i
				break
		return belongIndex

	def dump( self ):
		print etree.tostring(self.rootNode, pretty_print=True)
		pass

	def write2XML( self, path ):
		fo = open(path, "w")
		fo.write(etree.tostring(self.rootNode, pretty_print=True))
		pass
	def convert2JSON( self, sourc_path, dest_path ):
		with open( sourc_path, 'r') as xmlFile:
			data = xmlFile.read()

		with open( dest_path, 'w') as jsonFile:
			jsonFile.write(json.dumps(xmltodict.parse(data), indent=2))
		pass