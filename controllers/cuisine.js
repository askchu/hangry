    // const id = results.data.city_id;
            // const urlTwo = "https://developers.zomato.com/api/v2.1/cuisines?city_id=" + id;
            // const getCuisines = async () => {
            //     try {
            //         const cuisines = await axios.get(urlTwo, options)
            //         // console.log(cuisines.data.cuisines);
            //         // console.log(cuisines.data.cuisines[0].cuisine.cuisine_name); - prints out the first list

            //         // for (let i = 0; i < cuisines.data.cuisines.length; i++) {
            //         //     console.log(cuisines.data.cuisines[i].cuisine.cuisine_name);
            //         // }
            //         // prints out every cuisines in that city

            //         for (let i = 0; i < cuisines.data.cuisines.length; i++) {
            //             const cuisineNames = cuisines.data.cuisines[i].cuisine.cuisine_name;
            //             console.log(cuisineNames);
            //             // const food = await Hangry.findById(results._id)
            //             // find the ID and log data of id


            //             // const food = new Hangry({
            //             //     data: {
            //             //         cuisine: [
            //             //             {
            //             //                 cuisine_name: cuisines.data.cuisines[i].cuisine.cuisine_name,
            //             //                 cuisine_id: cuisines.data.cuisines[i].cuisine.cuisine_id
            //             //             }
            //             //         ]
            //             //     }
            //             // })
            //             // await food.save();
            //         }
            //     }
            //     catch (e) {
            //         console.log(e);
            //     }
            // }
            // getCuisines();