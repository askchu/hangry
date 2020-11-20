         // RUN GET CUISINE OF CITY API

            const id = results._id;
            const cityId = results.city_id;
            const urlTwo = "https://developers.zomato.com/api/v2.1/cuisines?city_id=" + cityId;

            const getCuisine = async () => {
                try {
                    const cuisines = await axios.get(urlTwo, options);
            
            // $ADDTOSET

            // const id = results._id;
            // const x = await Hangry.findByIdAndUpdate(id, { $addToSet: { cuisine_name: ["HOLY MOLY", "DINGLE BERRY", "BEAN STALK"] } }, { new: true },
            //     //setting new: true shows the new updated model.
            //     function (err, res) {
            //         if (err) {
            //             console.log(err);
            //         } else {
            //             console.log(res);
            //         }
            //     }
            // )


            // UPDATE BY ID

            // const id = results._id;
            // const x = await Hangry.findByIdAndUpdate(id, { "entity_type": "Grace is HOTTTTUUUUU" }, { new: true },
            //     //setting new: true shows the new updated model.
            //     function (err, res) {
            //         if (err) {
            //             console.log(err);
            //         } else {
            //             console.log(res);
            //         }
            //     }
            // )


    // // adds every cuisines found onto the database of the location searched
                    // for (food of cuisines.data.cuisines) {
                    //     const x = await Hangry.findByIdAndUpdate(id, { $addToSet: { cuisine_name: [food.cuisine.cuisine_name] } }, { new: true },
                    //         //     //setting new: true shows the new updated model.

                    //         // shows the updated lists
                    //         function (err, res) {
                    //             if (err) {
                    //                 console.log(err);
                    //             } else {
                    //                 console.log(res);
                    //             }
                    //         }
                    //     )
                    // }









                    <div id="main" class="container my-4 mh-75">
    <div class="mx-1 text-center row">
        <% for(let hangry of hangryz) { %>
        <div class="col-md-12 col-lg-4">
            <div class="card rounded-1 my-2">
                <div class="card-body bg-light">
                    <h3 class="card-title mb-3"><%=hangry.title%></h5>
                         <p class="card-text">Category: <%=hangry.entity_type%></p>
                    <p class="card-text text-muted">Entity Number: <%=hangry.entity_id%></p>
                    <p class="card-text">City Id: <%=hangry.city_id%></p> 
                        <button class="btn btn-primary">
                            <a class="text-light" href="/hangry/<%=hangry._id%>">View <%=hangry.title%></a>
                        </button>
                </div>
            </div>
        </div>
        <% } %>
    </div>
</div>