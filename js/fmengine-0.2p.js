// fmengine prototype// by Pushkov Alexander// requires: soundmanager2 jquery-1.7.1if(listhandler==null) {var listhandler = 'playlist.php'; }if(overmix==null) {var overmix = 5000; }var _doctitle;  function fmNext(sid) {    $.ajax({      url: listhandler,      success: function(data) {        mp3url = $.parseJSON(data).url;        //console.log('{fm} Next song is '+mp3url);        fmPlay(mp3url, sid);      }    })  }    function fmPlay(mp3url, sid) {    var sound = soundManager.createSound({      id: 'snd'+sid,      volume: 50,      url: mp3url    });    sound.load({      onload: function() {        this.onPosition(this.duration - overmix, function() {        fmNext(sid+1);        });      }    });    sound.play({      onid3: function(){        if (this.id3['TPE1'] != null) {          _doctitle = document.title;          document.title = '['+this.id3['TIT2']+'] - '+_doctitle;          $('#id3-artist').html  (this.id3['TPE1']);          $('#id3-songname').html(this.id3['TIT2']);          $('#id3').show('slow');          setTimeout("$('#id3').hide('slow'); document.title = _doctitle;", 5000);        }      },      onfinish: function() {        this.destruct();        //fmNext();      }    });  }    function fmInit() {    console.info('{fm} --- Started loading... ---');    soundManager.url = 'swf/';    soundManager.flashVersion = 9; // optional: shiny features (default = 8)    soundManager.useFlashBlock = false; // optionally, enable when you're ready to dive in    //soundManager.debugFlash = true    soundManager.waitForWindowLoad = true;        soundManager.onload = function() {      fmNext(0);    }    soundManager.onerror = function() {      console.error('{fm} SM error! Cannot use sounds.');    }  }