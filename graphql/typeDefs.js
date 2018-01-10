export const typeDefs = `
    type Query {
        node(id:ID!): Node
    }

    interface Node{
        id: ID!
    }

    type User implements Node {
        id: ID!
        emailValidated: Boolean
        username: String!
        email: String!
        avatar: String
        age: Int
        playlists: [Playlist]
        followedArtists: [Artist]
        listenedSongs: [Song]
        likedSongs: [Song]
    }

    type Playlist implements Node {
        id: ID!
        name: String
        tracks: [Song]
        cover: String
        private: Boolean
        expireDate: String
        trackCount: Int
    }

    type Album implements Node {
        id: ID!
        name: String
        cover: String
        releaseDate: String
    }

    type Song implements Node {
        id: ID!
        name: String!
        description: String
        genre: [String]
        releaseDate: String
        url: String
        cover: String
        album: Album
        tags: [String]
    }

    type Artist implements Node {
        id: ID!
        name: String
        description: String
        avatar: String
        age: Int
        albums: [Album]
        songs: [Song]
    }

`