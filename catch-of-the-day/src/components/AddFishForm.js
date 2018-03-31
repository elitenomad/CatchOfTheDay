import React, {Component} from 'react';
import PropTypes from 'prop-types';

class AddFishForm extends Component {
    nameRef = React.createRef();
    priceRef = React.createRef();
    statusRef = React.createRef();
    descRef = React.createRef();
    imageRef = React.createRef();

    createFish = (e) => {
        // 1. Stop the form from submitting
        e.preventDefault();
        // 2. Capture the form values
        const fish = {
            name: this.nameRef.value.value,
            price: parseFloat(this.priceRef.value.value),
            status: this.statusRef.value.value,
            desc: this.descRef.value.value,
            image: this.imageRef.value.value
        };
        this.props.addFish(fish);
        // Refresh the form
        e.currentTarget.reset();
    };

    render() {
        return (
            <form className='fish-edit' onSubmit={this.createFish}>
                <input name='name' ref={this.nameRef} type='text' placeholder='Name'/>
                <input name='price' ref={this.priceRef} type='text' placeholder='Price'/>
                <select name='status' ref={this.statusRef} type='text' placeholder='Status'>
                    <option value='available'>Fresh!</option>
                    <option value='unavailable'>Sold out!</option>
                </select>
                <textarea name='desc' ref={this.descRef} type='text' placeholder='Desc'/>
                <input name='image' ref={this.imageRef} type='text' placeholder='Image'/>
                <button type='submit'>+ Add Fish</button>
            </form>
        );
    }
}

AddFishForm.propTypes = {
    addFish: PropTypes.func
};

export default AddFishForm;
