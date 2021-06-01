<script>
    import Card from "./card/card.svelte"
    export let chooseCongratulation = []
    $: message = `You have ${chooseCongratulation.length} cards`
    $: chooseCongratulation = chooseCongratulation
    const clickcopie = (el) => {
        navigator.clipboard.writeText(el.target.textContent).then(() => {
            alert('text copied')
        })
        .catch(err => {
            console.log('Something went wrong', err);
        });
    }
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
        <div on:click={clickcopie} class = "card">
            <Card bind:event/>
        </div>
    {/each}
    
    
</div>