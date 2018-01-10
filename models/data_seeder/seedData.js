import {User,Song,Artist,Playlist,Album} from '../index';

const Chance = require('chance');
const chance = new Chance();

module.exports.createBase = ()=>{
    console.log("Filing Collections");
    let saves = [];
    for(let i = 0;i < 100;i++){
        let password = chance.word();
        let newUser = new User({
            emailValidated: chance.bool(),
            username: chance.first(),
            password: password,
            raw_password: password,
            email: chance.email(),
            avatar: chance.avatar({protocol:'https',fileExtension:'jpg'}),
            nickname: chance.first(),
            gender: chance.gender(),
            age: chance.age(),
        });
        saves.push(newUser.save().then(()=>{
            console.log("User saved")
        }).catch(()=>{
            console.log("User save failed")
        }));

        let newArtist = new Artist({
            name: chance.first(),
            description: chance.paragraph(),
        });
        saves.push(newArtist.save().then(()=>{
            console.log("Artist saved")
        }).catch(()=>{
            console.log("Artist save failed")
        }));
    };

    for(let i = 0;i < 1000;i++){
        let genre = [];
        let label = [];
        for(let i = 0;i < 10;i++){
            if(chance.bool()){
                genre.push(chance.word());
                label.push(chance.word());
            }
        }
        var newSong = new Song({
            name: chance.first(),
            description: chance.paragraph(),
            genre: genre,
            label: label,
            lyrics: [chance.paragraph()],
            releaseDate: chance.date(),
            cover: chance.avatar({protocol:'https',fileExtension:'jpg'}),
        });
        saves.push(newSong.save().then(()=>{
            console.log("Song saved")
        }).catch(()=>{
            console.log("Song save failed")
        }));
    }
    for(let i = 0;i < 50;i++){
        let expireDate = chance.bool() ? chance.date() : null;
        let newPlaylist = new Playlist({
            name: chance.word(),
            cover: chance.avatar({protocol:'https',fileExtension:'jpg'}),
            private: chance.bool(),
            expireDate: expireDate
        });
        saves.push(newPlaylist.save().then(()=>{
            console.log("Playlist saved")
        }).catch(()=>{
            console.log("Playlist save failed")
        }));
        
        let newAlbum = new Album({
            name: chance.word(),
            cover: chance.avatar({protocol:'https',fileExtension:'jpg'}),
            releaseDate: chance.date()
        });
        saves.push(newAlbum.save().then(()=>{
            console.log("Album saved")
        }).catch(()=>{
            console.log("Album save failed")
        }));
    };
    return saves;
};

module.exports.makeRelations = async function(){
    console.log("Making Relations");
    let userCount = await User.count();
    let songCount = await Song.count();
    let albumCount = await Album.count();
    let artistCount = await Artist.count();
    let playlistCount = await Playlist.count();

    // // Adding songs to Albums
    for(let i = 0;i < songCount;i++){
        let currentSong = await Song.find().limit(-1).skip(i);
        currentSong = currentSong[0];
        let random = chance.integer({min:0,max:albumCount-1});
        let album = await Album.findOne().skip(random);
        let albumId = album._id;
        
        Song.update({_id:currentSong._id},{
            albumId: albumId
        }).then((w)=>{
            console.log("Song Album Added");
        }).catch((err)=>{
            console.log("Song Album Update Failed");
        });
    };

    // // Adding song-artist Rels
    let possibleSongRels = ['Singer','Producer','Writter','Composer'];
    for(let i = 0;i < artistCount;i++){
        let songs = [];
        for(let j = 0;j < chance.integer({min:0,max:100});j++){
            let random = chance.integer({min:0,max:songCount-1});
            let song = await Song.findOne().skip(random);
            let songId = song._id;
            songs[j] = {
                rel: possibleSongRels[chance.integer({min:0,max:possibleSongRels.length-1})],
                song: songId
            }
        }

        let currentArtist = await Artist.find().limit(-1).skip(i);
        currentArtist = currentArtist[0];
        currentArtist.songs = songs;
        Artist.update({_id:currentArtist._id},currentArtist).then((w)=>{
            console.log("Artist Song Added");
        }).catch((err)=>{
            console.log("Artist Song Update Failed");
        });
    }

    // Adding songs to playlists
    for(let i = 0;i < playlistCount;i++){
        let tracks = [];
        for(let j = 0;j < chance.integer({min:0,max:100});j++){
            let random = chance.integer({min:0,max:songCount-1});
            let song = await Song.findOne().skip(random);
            let songId = song._id;
            tracks[j] = songId;
        }
        let currentPl = await Playlist.find().limit(-1).skip(i);
        currentPl = currentPl[0];
        currentPl.tracks = tracks;
        Playlist.update({_id:currentPl._id},currentPl).then((w)=>{
            console.log("Playlist Track Added");
        }).catch((err)=>{
            console.log("Playlist Track Update Failed");
        });
    }

    // Adding user created playlists
    let possibleUserSongRels = ['listened','liked','hated'];
    for(let i = 0;i < userCount;i++){
        let currentUser = await User.findOne().skip(i);
        let playlists = [];
        for(let j = 0;j < chance.integer({min:0,max:20});j++){
            let random = chance.integer({min:0,max:playlistCount-1});
            let pl = await Playlist.findOne().skip(random);
            let plId = pl._id;
            playlists[j] = plId;
        }
        
        let fArtists = [];
        for(let j = 0;j < chance.integer({min:0,max:50});j++){
            let random = chance.integer({min:0,max:artistCount-1});
            let artist = await Artist.findOne().skip(random);
            let artistId = artist._id;
            fArtists[j] = artistId;
        }

        let songRels = [];
        for(let j = 0;j < chance.integer({min:0,max:100});j++){
            let random = chance.integer({min:0,max:songCount-1});
            let song = await Song.findOne().skip(random);
            let songId = song._id;
            songRels[j] = {
                rel: possibleUserSongRels[chance.integer({min:0,max:possibleUserSongRels.length-1})],
                song: songId
            }
        }

        currentUser.playlists = playlists;
        currentUser.followedArtists = fArtists;
        currentUser.songsRels = songRels;
        User.update({_id:currentUser._id},currentUser).then((w)=>{
            console.log("User Relations Added");
        }).catch((err)=>{
            console.log("User Relations Update Failed");
        });
    }

    return "done";
}