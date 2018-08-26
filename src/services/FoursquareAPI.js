export const getLikes = (id) => {
    return fetch(`https://api.foursquare.com/v2/venues/${id}/likes?client_id=QJOTQ2YQTCC21WHFNVVAI3HLN04UCZIJTTFERBFUZJY2Z1PP&client_secret=SS5MAPRHOAMFIDTZFSGRN315BXF1F5OBHU3AZK5PQHGCYGLM&v=20180826`)
        .then(response => response.json())
        .then(data => data.response.likes.count );
};