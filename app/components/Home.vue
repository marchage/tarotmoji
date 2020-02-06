<template>
    <Page class="page" actionBarHidden="true">
        <GridLayout rows="auto, *, auto" columns="*, *, *">
            <Image src="~/assets/logo.png" width="195" marginTop="20" row="0"
                col="0" colSpan="3" />
            <!-- @see https://vuejs.org/v2/guide/components.html#Dynamic-Components -->
            <component v-for="component in componentsArray" :key="component"
                v-show="component === currentComponent" :is="component"
                row="1" col="0" colSpan="3" />
            <Button :class="navigationButtonClasses('CardOfTheDay')"
                text.decode="&#xf0c8;"
                @tap="currentComponent = 'CardOfTheDay'" row="2" col="0" />
            <Button :class="navigationButtonClasses('CardList')"
                text.decode="&#xf0c9;" @tap="currentComponent = 'CardList' "
                row="2" col="1" />
            <Button :class="navigationButtonClasses('Reading')"
                text.decode="&#xf24d;" @tap="currentComponent = 'Reading'"
                row="2" col="2" />
        </GridLayout>
    </Page>
</template>

<script>
    import CardOfTheDay from "../components/CardOfTheDay";
    import CardList from "../components/CardList";
    import Reading from "../components/Reading";

    export default {
        data() {
            return {
                currentComponent: "CardOfTheDay",
                componentsArray: ["CardOfTheDay", "CardList", "Reading"]
            };
        },
        computed: {
            navigationButtonClasses() {
                return component => ({
                    fa: true,
                    "nav-btn": true,
                    purple: component === this.currentComponent
                });
            }
        },
        components: {
            CardOfTheDay,
            CardList,
            Reading
        }
    };
</script>

<style>
    .nav-btn {
        color: #9D95B4;
        margin: 20;
        font-size: 30;
        padding: 10;
    }

    .purple {
        background-color: #5326BF;
        color: white;
        font-size: 30;
        border-radius: 10;
    }

    Button {
        background-color: rgba(255, 0, 0, 0.0);
        border-color: rgba(255, 0, 0, 0.0);
        border-width: 1;
    }
</style>
