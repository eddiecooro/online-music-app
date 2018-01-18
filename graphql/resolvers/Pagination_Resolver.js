
module.exports = {
    UserSongEdge: {
        node: (source, args, context) => {
            return source
        },
        cursor: (source, args, context) => {
            return source.__cursor
        }
    },
    PageInfo: {
        hasNextPage: (source, args, context) => {
            return source.NextPage
        },
        hasPreviousPage: (source, args, context) => {
            return source.PreviousPage

        }
    },
    UserSongConnection: {
        edges: (source, args, context) => {
            return source.result

        },
        pageInfo: (source, args, context) => {
            return {
                NextPage: source.hasNextPage,
                PreviousPage: source.hasPreviousPage
            }
        }
    }
}