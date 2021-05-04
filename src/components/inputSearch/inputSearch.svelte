<script>
    import { createEventDispatcher} from "svelte/internal";

    let dispatch = createEventDispatcher()
    let src = "search.png"
    let nameCard = ""
    let findWords = (e) => {
        dispatch("input", e.target.value)
    }
    
</script>

<style>
    .searchInput{
        border: none;
        border-bottom: 1px solid black;
        width: 100%;
    }
    .searchBlock {
        position: relative;
        width: 50%;
        margin: auto;
    }
    .searchIcon {
        position: absolute;
        width: 10px;
        right: 10px;
        top:50%;
        transform: translateY(-50%);
    }
</style>

<header>
    <div class = "searchBlock">
        <input placeholder = "search..." class = "searchInput" type="text" on:input={findWords} bind:value={nameCard} />
        <img class = "searchIcon" {src} alt="search">
    </div>
</header>