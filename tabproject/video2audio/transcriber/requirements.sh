path=$(pwd)
cd ${path}
brew install ffmpeg --with-fdk-aac --with-ffplay --with-freetype --with-frei0r --with-libass --with-libvo-aacenc --with-libvorbis --with-libvpx --with-opencore-amr --with-openjpeg --with-opus --with-rtmpdump --with-schroedinger --with-speex --with-theora --with-tools



#below is for installing ffmpeg in ubuntu
#brew install wget
#wget http://johnvansickle.com/ffmpeg/releases/ffmpeg-release-64bit-static.tar.xz
#tar xvfJ ffmpeg-release-64bit-static.tar.xz
#sudo rm ffmpeg-release-64bit-static.tar.xz
#mv ffmpeg* ffmpeg-static
