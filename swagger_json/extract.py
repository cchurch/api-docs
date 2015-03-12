import glob
import shutil
import os
for folder in glob.glob('*'):
	if os.path.exists(folder+'/index.json'):
		print folder
		shutil.copy(folder+'/index.json','een_binding/'+folder+'.json')
