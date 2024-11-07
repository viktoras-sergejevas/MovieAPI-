const Select = ( { data }) => {
    const selectGenre = (event) => {
        console.log(event.target.value)
    }
    return (
        <div>
        <select name="genre" id="category" onChange={selectGenre}>
            {data.map(item =>  {
                console.log(item)
                return (
                    <option value={item.name} key={item.id}>{item.name}</option>
                )
            })}
            
        </select>
        </div>
    )
}

export default Select
