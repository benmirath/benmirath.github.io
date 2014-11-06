
# .dexy/id_parsetab.py
# This file is automatically generated. Do not edit.
_tabversion = '3.2'

_lr_method = 'LALR'

_lr_signature = '\x0e\xa2,\x0e\x19\xbf\xe5\x95}s\xb9\xd7S\x9f\x05\x15'
    
_lr_action_items = {'DBLQUOTE':([20,33,35,40,56,58,68,71,74,76,80,81,92,],[34,34,-60,34,34,34,34,-59,34,34,34,34,34,]),'CODE':([0,1,3,8,10,15,16,18,21,22,25,27,28,29,31,33,43,44,45,46,47,48,52,53,65,66,69,72,82,84,],[1,-21,-20,1,-3,-4,1,-22,-2,-7,-22,-5,-19,48,-1,48,-6,-16,-17,-15,48,-18,48,-8,-14,-11,-13,-9,-12,-10,]),'END':([7,34,38,39,63,],[24,-57,-58,59,81,]),'WHITESPACE':([0,1,3,4,5,6,8,9,10,11,12,13,14,15,16,17,18,19,21,22,23,24,25,27,28,29,31,32,33,34,35,36,38,41,43,44,45,46,47,48,52,53,56,58,59,60,61,64,65,66,69,71,72,73,77,79,80,82,83,84,86,87,89,90,91,92,93,94,96,98,99,100,101,102,104,105,106,107,],[18,-21,-20,-31,-28,-34,25,-36,-3,-33,30,-32,-29,-4,18,-35,-22,-30,-2,-7,40,42,-22,-5,-19,45,-1,50,45,-57,-60,54,-58,-54,-6,-16,-17,-15,45,-18,45,-8,-60,54,-53,76,78,-55,-14,-11,-13,-59,-9,-37,-39,88,54,-12,-38,-10,93,-40,-41,95,97,54,-48,-42,-43,102,103,-44,-56,-50,-45,107,-46,-52,]),'COLONS':([34,37,38,40,51,],[-57,57,-58,62,57,]),'AMP':([29,],[49,]),'NEWLINE':([0,1,2,3,4,5,6,8,9,10,11,12,13,14,15,16,17,18,19,21,22,25,26,27,28,30,31,32,34,35,36,38,41,43,44,45,46,47,48,50,52,53,55,59,64,65,66,67,69,70,71,72,73,75,77,82,83,84,86,87,89,93,94,96,98,100,101,102,104,105,106,107,],[10,-21,22,-20,-31,-28,-34,27,-36,-3,-33,-24,-32,-29,-4,10,-35,-22,-30,-2,-7,-22,43,-5,-19,-25,-1,-26,-57,-60,53,-58,-54,-6,-16,-17,-15,66,-18,-27,69,-8,72,-53,-55,-14,-11,-23,-13,82,-59,-9,-37,84,-39,-12,-38,-10,-47,-40,-41,-48,-42,-43,-49,-44,-56,-50,-45,-51,-46,-52,]),'SGLQUOTE':([20,33,35,40,56,58,68,71,74,76,80,81,92,],[38,38,-60,38,38,38,38,-59,38,38,38,38,38,]),'IDIOCLOSE':([24,34,38,42,61,78,79,88,90,95,97,99,103,],[41,-57,-58,64,77,87,89,94,96,100,101,104,106,]),'AT':([20,33,],[39,39,]),'EXP':([7,39,],[23,60,]),'IDIO':([0,1,3,8,10,15,16,18,21,22,25,27,28,31,35,36,43,44,45,46,48,52,53,65,66,69,71,72,82,84,],[20,-21,-20,29,-3,-4,20,33,-2,-7,-22,-5,-19,-1,-60,55,-6,-16,-17,-15,-18,70,-8,-14,-11,-13,-59,-9,-12,-10,]),'WORD':([20,29,33,34,37,38,40,44,45,46,47,48,49,51,52,54,57,62,63,65,76,85,93,95,102,107,],[35,44,44,-57,56,-58,61,-16,-17,-15,44,-18,67,68,44,71,74,79,35,-14,35,35,71,99,35,71,]),'$end':([10,15,16,21,22,27,31,43,53,66,69,72,82,84,],[-3,-4,0,-2,-7,-5,-1,-6,-8,-11,-13,-9,-12,-10,]),'IDIOOPEN':([0,10,15,16,18,21,22,27,31,43,53,66,69,72,82,84,],[7,-3,-4,7,7,-2,-7,-5,-1,-6,-8,-11,-13,-9,-12,-10,]),}

_lr_action = { }
for _k, _v in _lr_action_items.items():
   for _x,_y in zip(_v[0],_v[1]):
      if not _x in _lr_action:  _lr_action[_x] = { }
      _lr_action[_x][_k] = _y
del _lr_action_items

_lr_goto_items = {'exportq':([0,16,18,],[14,14,14,]),'falsestart':([0,16,],[15,15,]),'codes':([0,16,],[8,8,]),'end':([0,16,18,],[9,9,9,]),'anything':([29,33,47,52,],[46,46,65,65,]),'inlineidio':([8,],[26,]),'idioline':([0,16,],[2,2,]),'idio':([0,16,18,],[12,12,32,]),'codon':([0,8,16,],[3,28,3,]),'closedcommentlevels':([0,16,18,],[11,11,11,]),'anythings':([29,33,],[47,52,]),'exportql':([0,16,18,],[19,19,19,]),'quote':([20,33,40,56,58,68,74,76,80,81,92,],[37,51,63,73,75,73,83,85,90,91,98,]),'sectionstart':([0,16,18,],[4,4,4,]),'export':([0,16,18,],[5,5,5,]),'words':([20,37,63,76,85,102,],[36,58,80,86,92,105,]),'entries':([0,],[16,]),'entry':([0,16,],[21,31,]),'closedcomment':([0,16,18,],[13,13,13,]),'closedcommentq':([0,16,18,],[6,6,6,]),'closedcommentql':([0,16,18,],[17,17,17,]),}

_lr_goto = { }
for _k, _v in _lr_goto_items.items():
   for _x,_y in zip(_v[0],_v[1]):
       if not _x in _lr_goto: _lr_goto[_x] = { }
       _lr_goto[_x][_k] = _y
del _lr_goto_items
_lr_productions = [
  ("S' -> entries","S'",1,None,None,None),
  ('entries -> entries entry','entries',2,'p_main','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',324),
  ('entries -> entry','entries',1,'p_main','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',325),
  ('entry -> NEWLINE','entry',1,'p_entry','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',329),
  ('entry -> falsestart','entry',1,'p_entry','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',330),
  ('entry -> codes NEWLINE','entry',2,'p_entry','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',331),
  ('entry -> codes inlineidio NEWLINE','entry',3,'p_entry','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',332),
  ('entry -> idioline NEWLINE','entry',2,'p_entry','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',333),
  ('falsestart -> IDIO words NEWLINE','falsestart',3,'p_sectionfalsestart','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',350),
  ('falsestart -> IDIO words IDIO NEWLINE','falsestart',4,'p_sectionfalsestart','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',351),
  ('falsestart -> IDIO quote words quote NEWLINE','falsestart',5,'p_sectionfalsestart','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',352),
  ('falsestart -> codes IDIO anythings NEWLINE','falsestart',4,'p_sectionfalsestart','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',353),
  ('falsestart -> WHITESPACE IDIO anythings IDIO NEWLINE','falsestart',5,'p_sectionfalsestart','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',354),
  ('falsestart -> WHITESPACE IDIO anythings NEWLINE','falsestart',4,'p_sectionfalsestart','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',355),
  ('anythings -> anythings anything','anythings',2,'p_anythings','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',359),
  ('anythings -> anything','anythings',1,'p_anythings','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',360),
  ('anything -> WORD','anything',1,'p_anything','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',364),
  ('anything -> WHITESPACE','anything',1,'p_anything','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',365),
  ('anything -> CODE','anything',1,'p_anything','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',366),
  ('codes -> codes codon','codes',2,'p_codes','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',370),
  ('codes -> codon','codes',1,'p_codes','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',371),
  ('codon -> CODE','codon',1,'p_codon','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',381),
  ('codon -> WHITESPACE','codon',1,'p_codon','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',382),
  ('inlineidio -> IDIO AMP WORD','inlineidio',3,'p_inlineidio','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',386),
  ('idioline -> idio','idioline',1,'p_idioline','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',390),
  ('idioline -> idio WHITESPACE','idioline',2,'p_idioline','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',391),
  ('idioline -> WHITESPACE idio','idioline',2,'p_idioline','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',392),
  ('idioline -> WHITESPACE idio WHITESPACE','idioline',3,'p_idioline','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',393),
  ('idio -> export','idio',1,'p_linecontent','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',397),
  ('idio -> exportq','idio',1,'p_linecontent','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',398),
  ('idio -> exportql','idio',1,'p_linecontent','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',399),
  ('idio -> sectionstart','idio',1,'p_linecontent','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',400),
  ('idio -> closedcomment','idio',1,'p_linecontent','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',401),
  ('idio -> closedcommentlevels','idio',1,'p_linecontent','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',402),
  ('idio -> closedcommentq','idio',1,'p_linecontent','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',403),
  ('idio -> closedcommentql','idio',1,'p_linecontent','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',404),
  ('idio -> end','idio',1,'p_linecontent','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',405),
  ('sectionstart -> IDIO quote WORD quote','sectionstart',4,'p_sectionstart','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',410),
  ('sectionstart -> IDIO quote COLONS WORD quote','sectionstart',5,'p_sectionstart','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',411),
  ('closedcomment -> IDIOOPEN EXP WHITESPACE WORD IDIOCLOSE','closedcomment',5,'p_closed_comment','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',421),
  ('closedcomment -> IDIOOPEN EXP WHITESPACE WORD WHITESPACE IDIOCLOSE','closedcomment',6,'p_closed_comment','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',422),
  ('closedcommentlevels -> IDIOOPEN EXP WHITESPACE COLONS WORD IDIOCLOSE','closedcommentlevels',6,'p_closed_comment_levels','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',427),
  ('closedcommentlevels -> IDIOOPEN EXP WHITESPACE COLONS WORD WHITESPACE IDIOCLOSE','closedcommentlevels',7,'p_closed_comment_levels','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',428),
  ('closedcommentq -> IDIOOPEN EXP WHITESPACE quote words quote IDIOCLOSE','closedcommentq',7,'p_closed_comment_quoted','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',433),
  ('closedcommentq -> IDIOOPEN EXP WHITESPACE quote words quote WHITESPACE IDIOCLOSE','closedcommentq',8,'p_closed_comment_quoted','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',434),
  ('closedcommentql -> IDIOOPEN EXP WHITESPACE quote words quote WHITESPACE WORD IDIOCLOSE','closedcommentql',9,'p_closed_comment_quoted_with_language','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',439),
  ('closedcommentql -> IDIOOPEN EXP WHITESPACE quote words quote WHITESPACE WORD WHITESPACE IDIOCLOSE','closedcommentql',10,'p_closed_comment_quoted_with_language','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',440),
  ('export -> IDIO AT EXP WHITESPACE words','export',5,'p_export','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',446),
  ('export -> IDIO AT EXP WHITESPACE words WHITESPACE','export',6,'p_export','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',447),
  ('exportq -> IDIO AT EXP WHITESPACE quote words quote','exportq',7,'p_export_quoted','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',452),
  ('exportq -> IDIO AT EXP WHITESPACE quote words quote WHITESPACE','exportq',8,'p_export_quoted','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',453),
  ('exportql -> IDIO AT EXP WHITESPACE quote words quote WHITESPACE words','exportql',9,'p_export_quoted_with_language','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',458),
  ('exportql -> IDIO AT EXP WHITESPACE quote words quote WHITESPACE words WHITESPACE','exportql',10,'p_export_quoted_with_language','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',459),
  ('end -> IDIO AT END','end',3,'p_end','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',464),
  ('end -> IDIOOPEN END IDIOCLOSE','end',3,'p_end','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',465),
  ('end -> IDIOOPEN END WHITESPACE IDIOCLOSE','end',4,'p_end','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',466),
  ('end -> IDIOOPEN EXP WHITESPACE quote END quote WHITESPACE IDIOCLOSE','end',8,'p_end','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',467),
  ('quote -> DBLQUOTE','quote',1,'p_quote','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',471),
  ('quote -> SGLQUOTE','quote',1,'p_quote','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',472),
  ('words -> words WHITESPACE WORD','words',3,'p_words','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',476),
  ('words -> WORD','words',1,'p_words','/Library/Python/2.7/site-packages/dexy-1.0.14-py2.7.egg/dexy/filters/id.py',477),
]
