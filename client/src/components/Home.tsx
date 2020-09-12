import React, { useEffect } from 'react';
import _ from 'lodash';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCardTitle,
  MDBCardText,
} from 'mdbreact';
import Card from '../components/product/Card';
import { Link } from 'react-router-dom';
import { ResponseDataProduct } from './product/types';
import useRequest from '../hooks/user-request';
import Loader from './Loader';
const renderBody = (product: ResponseDataProduct) => {
  return (
    <>
      <Link to={`/products/view/${product.id}`}>
        <MDBCardTitle tag="h5">{product.name}</MDBCardTitle>
      </Link>
      <MDBCardText>{`Price ${product.price}`}</MDBCardText>
    </>
  );
};

const renderCard = (product: ResponseDataProduct[]) =>
  product.map((p) => {
    return (
      <MDBCol sm="4" key={p.id}>
        <Card image={p.imageUrl} children={renderBody(p)} />
      </MDBCol>
    );
  });

const renderHome = (products: ResponseDataProduct[]) => {
  let tempArrayProducts = _.chunk(products, 3);
  return tempArrayProducts.map((product, index) => {
    return (
      <MDBRow style={{ padding: '25px 25px 25px 25px' }} key={index}>
        {renderCard(product)}
      </MDBRow>
    );
  });
};

const Home = () => {
  const { doRequest, resposeData: products } = useRequest<
    ResponseDataProduct[]
  >({
    url: '/api/product',
    method: 'get',
  });

  useEffect(() => {
    doRequest();
  }, [doRequest]);

  if (!products) {
    return <Loader />;
  }

  return <MDBContainer>{renderHome(products)}</MDBContainer>;
};

export default Home;
