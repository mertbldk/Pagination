<template>
    <div id="productContainer">
        <div id="ChoiceContainer">
            <p id="logo">Vue - Pagination</p>
            <select @change="arrangementSelect">
                <option>The Newests</option>
                <option>Price Low To High</option>
                <option>Price High To Low</option>
            </select>
        </div>
        <div id="productsContainer">
            <Card v-for="i in productCard" :key="i.id" :item="i"/>
        </div>
        <div id="paginationContainer">
            <div id="paginationCap">

                <div id="back" v-if="pageParams > 1" @click="pageFirst"><fa icon="angles-left"></fa></div>
                <div id="back" v-if="pageParams > 1" @click="pageBack"><fa icon="angle-left"></fa></div>

                <div id="pageNumber" v-if="productLength >= 1" @click="pageNumber(pageParams >= productLength-2 ? productLength-2 : pageParams)">
                    {{pageParams >= productLength-2 ? Math.abs(productLength-2) == 0 ? 1 : Math.abs(productLength-2) : pageParams}}
                </div>
                <div id="pageNumber" v-if="productLength >= 2" @click="pageNumber(pageParams >= productLength-2 ? productLength-1 : pageParams+1)">
                    {{pageParams >= productLength-2 ? productLength-1 == 1 ? 2 : productLength-1 : pageParams+1}}
                </div>
                <div id="pageNumber" v-if="productLength >= 3" @click="pageNumber(pageParams >= productLength-2 ? productLength : pageParams+2)">
                    {{pageParams >= productLength-2 ? productLength : pageParams+2}}
                </div>

                <div id="next" v-if="pageParams <= productLength - 3" @click="pageNext"><fa icon="angle-right"></fa></div>
                <div id="next" v-if="pageParams <= productLength - 3" @click="pageLast"><fa icon="angles-right"></fa></div>

            </div>
        </div>
    </div>
</template>

<script>
import Card from '../components/Card.vue';

export default {
    components:{Card},
    data() {
        return {
            pageParams : Number(this.$route.query.page) || 1,
            apiQuery : this.$route.query.arrangement || 'apiTheNewests',
            productCard : '',
            productLength : '',
        }
    },
    methods: {
        pageBack(){

            this.pageParams = this.pageParams - 1;

            this.routerPush(this.apiQuery,this.pageParams);
            this.setTimeoutReload();

        },
        pageNext(){

            this.pageParams = this.pageParams + 1;

            this.routerPush(this.apiQuery,this.pageParams);
            this.setTimeoutReload();

        },
        pageNumber(event){

            this.pageParams = event;

            this.routerPush(this.apiQuery,this.pageParams);
            this.setTimeoutReload();

        },
        pageFirst(){

            this.pageParams = 1;

            this.routerPush(this.apiQuery,this.pageParams);
            this.setTimeoutReload();

        },
        pageLast(){

            this.pageParams = this.productLength;
            
            this.routerPush(this.apiQuery,this.pageParams);
            this.setTimeoutReload();

        },
        routerPush(event1,event2){

            this.$router.push({
                name : 'Product',
                query : {
                    arrangement : event1,
                    page : event2
                }
            });

        },
        setTimeoutReload(){
            setTimeout(()=>window.location.reload(),1);
        },
        arrangementSelect(){

            let select = document.querySelector('select');
            
            if(select.selectedIndex == 0){

                this.apiQuery = 'apiTheNewests';

                this.routerPush(this.apiQuery,1);
                this.setTimeoutReload();

            }
            if(select.selectedIndex == 1){

                this.apiQuery = 'apiPriceLowToHigh';

                this.routerPush(this.apiQuery,1);
                this.setTimeoutReload();

            }
            if(select.selectedIndex == 2){

                this.apiQuery = 'apiPriceHighToLow';

                this.routerPush(this.apiQuery,1);
                this.setTimeoutReload();

            }

        },
        api(event){

            this.$store.dispatch(event,this.pageParams).then(response => {
                this.productCard = response.productCard;
                this.productLength = response.productLength;
            });

        }
    },
    created() {

        this.api(this.apiQuery);
        this.routerPush(this.apiQuery,this.pageParams);

    },
    mounted() {

        let option = document.querySelectorAll('option');

        if(this.apiQuery == "apiTheNewests"){
            option[0].selected = true;
        }
        if(this.apiQuery == "apiPriceLowToHigh"){
            option[1].selected = true;
        }
        if(this.apiQuery == "apiPriceHighToLow"){
            option[2].selected = true;
        }
    
    },
}
</script>
