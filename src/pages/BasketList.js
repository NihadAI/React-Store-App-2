import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../components/main/ProductCard';
import Button from '../components/UI/button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../API/fetch';
import { removeFromBasket } from '../features/basketSlice';

const BasketList = ({ onBasketChange }) => {
    const dispatch = useDispatch();
    const basketItems = useSelector(state => state.basket);
    const products = useSelector(state => state.data.products);

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    const getBasketProducts = () => {
        return products.filter(card => basketItems.includes(card.id));
    };

    const basketProducts = getBasketProducts();

    const handleRemoveFromBasket = cardId => {
        dispatch(removeFromBasket(cardId));
        onBasketChange(basketItems);
    };

    return (
        <div className="card-list container">
            {basketProducts.length > 0 ? (
                basketProducts.map(card => (
                    <div className="card" key={card.id}>
                        <ProductCard {...card} onBasketChange={onBasketChange} hideStar buttonText="X" onButtonClick={() => handleRemoveFromBasket(card.id)} />

                        <Button className="card__footer-button buy-button" text="buy" />
                    </div>
                ))
            ) : (
                <p className="empty-basket">Shopping basket is empty</p>
            )}
        </div>
    );
};

BasketList.propTypes = {
    onBasketChange: PropTypes.func,
};

export default BasketList;
