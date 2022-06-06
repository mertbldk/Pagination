<template>
    <div id="cardContainer">
        <div id="cardImg">
            <img :src="item.images[0]">
        </div>
        <div id="cardNamePrice">
            <div id="cardName">{{item.title}}</div>
            <div id="cardPrice">{{item.price}} $</div>
        </div>
    </div>
</template>

<script>
export default {
    props:['item'],
}
</script>