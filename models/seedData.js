// import {User} from './User';
// import {Song} from './Song';
// import {Artist} from './Artist';
// import {Playlist} from './Playlist';
import {User,Song,Artist,Playlist,Album} from './index';

const Chance = require('chance');
const chance = new Chance();

module.exports.createBase = ()=>{
    console.log("Filing User Collection");
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

        // let songs = [];
        // let possibleSongRels = ['Singer','Producer','Writter'];
        // for(let i = 0;i < chance.integer({min:0,max:100});i++){
        //     songs[i] = {

        //     }
        // }
        let newArtist = new Artist({
            name: chance.first(),
            description: chance.paragraph(),
        })
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
