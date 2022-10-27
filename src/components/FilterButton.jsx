function FilterButton(props) {
    return (
        <button 
          type="button" 
          className="btn toggle-btn" 
          aria-pressed={props.isPressed}
          onClick={() => props.setCategory(props.name)}
        >
          <span className="visually-hidden">Show </span>        
          <span>{props.name} </span>
          <span className="visually-hidden"> Tasks</span>        
        </button>
    );
}

export default FilterButton;