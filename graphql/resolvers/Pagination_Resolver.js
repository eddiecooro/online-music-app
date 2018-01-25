
module.exports = {
    UserSongEdge: {
        node: (source, args, ctx) => {
            return source
        },
        cursor: (source, args, ctx) => {
            return source.__cursor
        }
    },
    PageInfo: {
        hasNextPage: (source, args, ctx) => {
            return source.NextPage
        },
        hasPreviousPage: (source, args, ctx) => {
            return source.PreviousPage

        }
    },
    UserSongConnection: {
        edges: (source, args, ctx) => {
            return source.result

        },
        pageInfo: (source, args, ctx) => {
            return {
                NextPage: source.hasNextPage,
                PreviousPage: source.hasPreviousPage
            }
        }
    }
}