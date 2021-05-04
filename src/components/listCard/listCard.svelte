<script>
    import Card from "./card/card.svelte"
    export let chooseCongratulation = []
    $: message = `You have ${chooseCongratulation.length} cards`
    $: chooseCongratulation = chooseCongratulation
</script>

<style>
    .card {
        display: flex;
        justify-content: center;
        margin: 10px;
    }
</style>

<div>
    <hr>
    <p>{message}</p>
    {#each chooseCongratulation as event}
        <div class = "card">
            <Card bind:event/>
        </div>
    {/each}
    
    
</div>