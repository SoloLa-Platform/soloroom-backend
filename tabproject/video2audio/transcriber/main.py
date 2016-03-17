#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import webapp2
from jinja2 import Environment, PackageLoader
from paste import httpserver
from video_handler import get_video
from video_handler import video_download
env = Environment(loader=PackageLoader('main', 'templates'))

class MainHandler(webapp2.RequestHandler):
    def get(self):
        template = env.get_template('index.html')
        self.response.out.write(template.render())
    def post(self):
        video_url = self.request.get('video_url')
        if video_url:
            download_video=get_video(video_url)



app = webapp2.WSGIApplication([
    ('/', MainHandler)
], debug=True)


def main():
    httpserver.serve(app, host='0.0.0.0', port='8100')

if __name__ == '__main__':
    main()
