export function Search({resSearch}) {
    return (
        <>
            <input 
                type="search" 
                placeholder="Поиск"
                onChange={(e) => {
                    resSearch(e.target.value)
                }}    
            />
        </>
    );
}