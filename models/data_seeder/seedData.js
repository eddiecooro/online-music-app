import UserModel from "../User"
var User = UserModel
import SongModel from "../Song"
var Song = SongModel
import PlaylistModel from "../Playlist"
var Playlist = PlaylistModel
import ArtistModel from "../Artist"
var Artist = ArtistModel
import AlbumModel from "../Album"
var Album = AlbumModel

const Chance = require('chance');
const chance = new Chance();
const db = require('../../DataBase/DataBaseConnection')

module.exports.createBase = () => {
    console.log("Filing Collections");
    let saves = [];
    for (let i = 0; i < 100; i++) {
        let password = chance.word().toString();
        saves.push(
            new Promise((reslolve, reject) => {
                User.save({
                    emailValidated: chance.bool(),
                    username: chance.word(),
                    password: password,
                    raw_password: password,
                    email: chance.email(),
                    avatar: chance.avatar({ protocol: 'https', fileExtension: 'jpg' }),
                    nickname: chance.first(),
                    gender: chance.gender(),
                    age: chance.age(),
                }, (err, saved) => {
                    if (err) {
                        reject(err)
                    }
                    reslolve(saved)

                });
            }).then((saved) => {
                console.log("User saved")

            }).catch((err) => {
                console.log("User save failed")
                console.log(err)
                return err
            })
        )
    }
    for (let i = 0; i < 100; i++) {
        saves.push(
            new Promise((resolve, reject) => {
                Artist.save({
                    name: chance.first(),
                    avatar: chance.avatar({ protocol: 'https', fileExtension: 'jpg' }),
                    age: chance.age(),
                    description: chance.paragraph(),
                }, (err, saved) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(saved)
                })
            }).then((saved) => {
                console.log("Artist saved")

            }).catch((err) => {
                console.log(err)
                console.log("Artist save failed")
                return err

            })
        );
    }

    for (let i = 0; i < 200; i++) {
        let genre = [];
        for (let i = 0; i < 10; i++) {
            if (chance.bool()) {
                genre.push(chance.word());
            }
        }
        saves.push(
            new Promise((resolve, reject) => {
                Song.save({
                    name: chance.word(),
                    description: chance.paragraph(),
                    genre: genre,
                    lyrics: [chance.paragraph()],
                    releaseDate: chance.date(),
                    cover: chance.avatar({ protocol: 'https', fileExtension: 'jpg' }),
                }, (err, saved) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(saved)
                })
            }).then((saved) => {
                console.log("Song saved")

            }).catch((err) => {
                console.log(err)
                console.log("Song save failed")
                return err

            })
        );
    }

    for (let i = 0; i < 50; i++) {
        let expireDate = chance.bool() ? chance.date() : null;
        saves.push(
            new Promise((resolve, reject) => {
                Playlist.save({
                    name: chance.word(),
                    cover: chance.avatar({ protocol: 'https', fileExtension: 'jpg' }),
                    private: chance.bool(),
                    expireDate: expireDate
                }, (err, saved) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(saved)
                })
            }).then((saved) => {
                console.log("Playlist saved")

            }).catch((err) => {
                console.log(err)
                console.log("Playlist save failed")
                return err

            })
        );
    }
    for (let i = 0; i < 100; i++) {
        saves.push(
            new Promise((resolve, reject) => {
                Album.save({
                    name: chance.word(),
                    cover: chance.avatar({ protocol: 'https', fileExtension: 'jpg' }),
                    releaseDate: chance.date()
                }, (err, saved) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(saved)
                })
            }).then((saved) => {
                console.log("Album saved")

            }).catch((err) => {
                console.log(err)
                console.log("Album save failed")
                return err

            })
        );
    }

    return saves

}



module.exports.MakeRels = async () => {
let ids = { User: [], Artist: [], Song: [], Playlist: [], Album: [] };
  
    console.log("Gettin Ids")
    //Getting User Ids
    ids.User = await new Promise((resolve, reject) => {
        db.nodesWithLabel('User', (err, result) => {
            if (err) {
                console.log(err)
                reject(err)
            }
            result = result.map((e) => e.id)
            resolve(result)
        })
    })

    //Getting Artist Ids
    ids.Artist = await new Promise((resolve, reject) => {
        db.nodesWithLabel('Artist', (err, result) => {
            if (err) {
                console.log(err)
                reject(err)
            }
            result = result.map((e) => e.id)
            resolve(result)
        })
    })
    //Getting Song Ids
    ids.Song = await new Promise((resolve, reject) => {
        db.nodesWithLabel('Song', (err, result) => {
            if (err) {
                console.log(err)
                reject(err)
            }
            result = result.map((e) => e.id)
            resolve(result)
        })
    })
    //Getting Playlist Ids
    ids.Playlist = await new Promise((resolve, reject) => {
        db.nodesWithLabel('PlayList', (err, result) => {
            if (err) {
                console.log(err)
                reject(err)
            }
            result = result.map((e) => e.id)
            resolve(result)
        })
    })
    //Getting Album Ids
    ids.Album = await new Promise((resolve, reject) => {
        db.nodesWithLabel('Album', (err, result) => {
            if (err) {
                console.log(err)
                reject(err)
            }
            result = result.map((e) => e.id)
            resolve(result)
        })
    })


    console.log("Making Relations");
    let userCount = ids.User.length;
    let songCount = ids.Song.length;
    let albumCount = ids.Album.length;
    let artistCount = ids.Artist.length;
    let playlistCount = ids.Playlist.length;

    // Adding songs to Albums
    for (let i = 0; i < songCount; i++) {
        let currentSong = ids.Song[i]
        let random = chance.integer({ min: 0, max: albumCount - 1 });
        let album = ids.Album[random]
        db.rel.create(currentSong, 'SONG_OF', album, (err, rel) => {
            if (err) {
                console.log("SongOf_Album Update Failed");
                return err
            }
            console.log("SongOf_Album Added");
            return true
        });
    }



    // // Adding Song_Of_Artist Rels
    let possibleSongRels = ['Singer_Of', 'Producer_Of', 'Writter_Of', 'Composer_Of'];
    for (let i = 0; i < artistCount; i++) {
        let artist = ids.Artist[i]
        for (let j = 0; j < chance.integer({ min: 0, max: 100 }); j++) {
            let random = chance.integer({ min: 0, max: songCount - 1 });
            let random_roll = chance.integer({ min: 0, max: possibleSongRels.length - 1 });
            let song = ids.Song[random];
            db.rel.create(artist, 'ARTIST_OF', song, { rolls: possibleSongRels[random_roll] }, (err, rel) => {
                if (err) {
                    console.log("ArtistOf_Song Create Failed");
                    return err
                }
                console.log("ArtistOf_Song Added");
                return true
            });
        }
    }


    // Adding album-artist Rels
    // let possibleAlbumRels = ['Singer_Of', 'Producer_Of', 'Writter_Of', 'Composer_Of'];
    // for (let i = 0; i < artistCount; i++) {
    //     let artist = ids.Artist[i]
    //     for (let j = 0; j < chance.integer({ min: 0, max: 100 }); j++) {
    //         let random = chance.integer({ min: 0, max: albumCount - 1 });
    //         let random_roll = chance.integer({ min: 0, max: possibleAlbumRels.length - 1 });
    //         let album = ids.Album[random]
    //         db.rel.create(artist, possibleAlbumRels[random_roll], album, (err, rel) => {
    //             if (err) {
    //                 console.log("ArtistOf_Album Create Failed");
    //                 return err
    //             }
    //             console.log("ArtistOf_Album Added");
    //             return true
    //         })
    //     }

    // }

    // Adding songs to playlists
    for (let i = 0; i < playlistCount; i++) {
        let playlist = ids.Playlist[i]
        for (let j = 0; j < chance.integer({ min: 0, max: 100 }); j++) {
            let random = chance.integer({ min: 0, max: songCount - 1 });
            let song = ids.Song[random]
            db.rel.create(song, 'CONTAIN', playlist, (err, rel) => {
                if (err) {
                    console.log("SongOf_Playlist Create Failed");
                    return err
                }
                console.log("SongOf_Playlist Added");
                return true
            })
        }
    }



    //  Adding user Song Rels
    let possibleUserSongRels = ['LISTENED', 'LIKED', 'HATED'];
    for (let i = 0; i < userCount; i++) {
        let user = ids.User[i]
        for (let j = 0; j < chance.integer({ min: 0, max: 100 }); j++) {
            let random = chance.integer({ min: 0, max: songCount - 1 });
            let random_rels = chance.integer({ min: 0, max: possibleUserSongRels.length - 1 });
            let song = ids.Song[random]
            db.rel.create(user, possibleUserSongRels[random_rels], song, (err, rel) => {
                if (err) {
                    console.log("User_Song Rel Create Failed");
                    return err
                }
                console.log("User_Song Rel Added");
                return true
            })

        }
    }

    //Adding User Playlist Rels
    for (let i = 0; i < userCount; i++) {
        let user = ids.User[i]
        for (let j = 0; j < chance.integer({ min: 0, max: 100 }); j++) {
            let random = chance.integer({ min: 0, max: playlistCount - 1 });
            let playlist = ids.Playlist[random]
            db.rel.create(playlist, 'CREATED_BY', user, (err, rel) => {
                if (err) {
                    console.log("User_Playlist Rel Create Failed");
                    return err
                }
                console.log("User_Playlist Rel Added");
                return true
            })

        }
    }

    //Adding User Artist Rels
    for (let i = 0; i < userCount; i++) {
        let user = ids.User[i]
        for (let j = 0; j < chance.integer({ min: 0, max: 100 }); j++) {
            let random = chance.integer({ min: 0, max: artistCount - 1 });
            let artist = ids.Artist[random]
            db.rel.create(user, 'FOLLOWED', artist, (err, rel) => {
                if (err) {
                    console.log("User_Artist Rel Create Failed");
                    return err
                }
                console.log("User_Artist Rel Added");
                return true
            })

        }
    }


    return true
}







// // module.exports.makeRelations = async function () {
//     let userCount = await User.count();
//     let songCount = await Song.count();
//     let albumCount = await Album.count();
//     let artistCount = await Artist.count();
//     let playlistCount = await Playlist.count();

// //     // // Adding songs to Albums
// //     for (let i = 0; i < songCount; i++) {
// //         let currentSong = await Song.find().limit(-1).skip(i);
// //         currentSong = currentSong[0];
// //         let random = chance.integer({ min: 0, max: albumCount - 1 });
// //         let album = await Album.findOne().skip(random);
// //         let albumId = album._id;

// //         Song.update({ _id: currentSong._id }, {
// //             albumId: albumId
// //         }).then((w) => {
// //             console.log("Song Album Added");
// //         }).catch((err) => {
// //             console.log("Song Album Update Failed");
// //         });
// //     };

// //     // // Adding song-artist Rels
// //     let possibleSongRels = ['Singer', 'Producer', 'Writter', 'Composer'];
// //     for (let i = 0; i < artistCount; i++) {
// //         let songs = [];
// //         for (let j = 0; j < chance.integer({ min: 0, max: 100 }); j++) {
// //             let random = chance.integer({ min: 0, max: songCount - 1 });
// //             let song = await Song.findOne().skip(random);
// //             let songId = song._id;
// //             songs[j] = {
// //                 rel: possibleSongRels[chance.integer({ min: 0, max: possibleSongRels.length - 1 })],
// //                 song: songId
// //             }
// //         }

// //         let currentArtist = await Artist.find().limit(-1).skip(i);
// //         currentArtist = currentArtist[0];
// //         currentArtist.songs = songs;
// //         Artist.update({ _id: currentArtist._id }, currentArtist).then((w) => {
// //             console.log("Artist Song Added");
// //         }).catch((err) => {
// //             console.log("Artist Song Update Failed");
// //         });
// //     }
// //     // // Adding album-artist Rels
// //     let possibleAlbumRels = ['Singer', 'Producer', 'Writter', 'Composer'];
// //     for (let i = 0; i < artistCount; i++) {
// //         let albums = [];
// //         for (let j = 0; j < chance.integer({ min: 0, max: 100 }); j++) {
// //             let random = chance.integer({ min: 0, max: albumCount - 1 });
// //             let album = await Song.findOne().skip(random);
// //             let albumId = album._id;
// //             albums[j] = {
// //                 rel: possibleAlbumRels[chance.integer({ min: 0, max: possibleAlbumRels.length - 1 })],
// //                 album: albumId
// //             }
// //         }

// //         let currentArtist = await Artist.find().limit(-1).skip(i);
// //         currentArtist = currentArtist[0];
// //         currentArtist.albums = albums;
// //         Artist.update({ _id: currentArtist._id }, currentArtist).then((w) => {
// //             console.log("Artist Album Added");
// //         }).catch((err) => {
// //             console.log("Artist Album Update Failed");
// //         });
// //     }
// //     // Adding songs to playlists
// //     for (let i = 0; i < playlistCount; i++) {
// //         let tracks = [];
// //         for (let j = 0; j < chance.integer({ min: 0, max: 100 }); j++) {
// //             let random = chance.integer({ min: 0, max: songCount - 1 });
// //             let song = await Song.findOne().skip(random);
// //             let songId = song._id;
// //             tracks[j] = songId;
// //         }
// //         let currentPl = await Playlist.find().limit(-1).skip(i);
// //         currentPl = currentPl[0];
// //         currentPl.tracks = tracks;
// //         Playlist.update({ _id: currentPl._id }, currentPl).then((w) => {
// //             console.log("Playlist Track Added");
// //         }).catch((err) => {
// //             console.log("Playlist Track Update Failed");
// //         });
// //     }

// //     // Adding user created playlists
// //     let possibleUserSongRels = ['listened', 'liked', 'hated'];
// //     for (let i = 0; i < userCount; i++) {
// //         let currentUser = await User.findOne().skip(i);
// //         let playlists = [];
// //         for (let j = 0; j < chance.integer({ min: 0, max: 20 }); j++) {
// //             let random = chance.integer({ min: 0, max: playlistCount - 1 });
// //             let pl = await Playlist.findOne().skip(random);
// //             let plId = pl._id;
// //             playlists[j] = plId;
// //         }

// //         let fArtists = [];
// //         for (let j = 0; j < chance.integer({ min: 0, max: 50 }); j++) {
// //             let random = chance.integer({ min: 0, max: artistCount - 1 });
// //             let artist = await Artist.findOne().skip(random);
// //             let artistId = artist._id;
// //             fArtists[j] = artistId;
// //         }

// //         let songRels = [];

// //         for (let j = 0; j < chance.integer({ min: 0, max: 100 }); j++) {
// //             let random = chance.integer({ min: 0, max: songCount - 1 });
// //             let song = await Song.findOne().skip(random);
// //             let songsId = song._id;
// //             songRels[j] = {
// //                 rel: possibleUserSongRels[chance.integer({ min: 0, max: possibleUserSongRels.length - 1 })],
// //                 songId: songsId
// //             }
// //         }

// //         currentUser.playlists = playlists;
// //         currentUser.followedArtists = fArtists;
// //         currentUser.songsRels = songRels;

// //         User.update({ _id: currentUser._id }, currentUser).then((w) => {
// //             console.log(w);
// //             console.log("User Relations Added");
// //         }).catch((err) => {
// //             console.log("User Relations Update Failed");
// //         });
// //     }

// //     return "done";
// // }
