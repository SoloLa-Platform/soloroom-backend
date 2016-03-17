import os
import youtube_dl
import glob
import subprocess
#from logger import Logger
#logging = Logger.get_instance()

#test video url:
#https://youtu.be/oFUYnR90c3s
def get_video(video_url):

    file_name="video"
    video_path=video_download(video_url,file_name)
    audio_path=os.path.join(os.path.dirname(__file__), 'media/extracted_audio/audio.wav')
    command = "ffmpeg -i "+video_path+" -ab 160k -ac 2 -ar 44100 -vn "+audio_path
    subprocess.call(command, shell=True)


def video_download(url,file_name):
    file = None
    if url is None:
        return file
    base_dir = os.path.join(os.path.dirname(__file__), 'media/unprocessed_video/')
    file_path = base_dir + file_name+'.%(ext)s'
    ydl_opts = {'outtmpl': file_path}
    try:
        with youtube_dl.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])
        file = base_dir+file_name+'*'
        file = glob.glob(file)
        file = file[0]
    except:
        #logging.error("Fail to download video {}".format(url))
        print "Fail to down video!"
    return file
