import { Test, TestingModule } from '@nestjs/testing';

import { Product } from 'src/models/product.interface';
import { ProductController } from './product.controller';
import { ProductService } from './services/product.service';

describe('ProductController', () => {
  let controller: ProductController;
  const products: Product[] = [
    {
      id: 123,
      name: 'Chair',
      price: 12,
    },
  ];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            getAllProducts: jest.fn().mockReturnValue(products),
            getProductDetails: jest.fn().mockReturnValue(products[0]),
            createNewProduct: jest.fn().mockReturnValue(products[0]),
            deleteProduct: jest.fn().mockReturnValue(products[0]),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('Should get all products based on the pagination', () => {
    expect(controller.getAllProducts({ page: 1, limit: 10 })).toStrictEqual(
      products,
    );
  });
  it('Should get product by id', () => {
    expect(controller.getProductDetails(123)).toStrictEqual(products[0]);
  });
  it('Should create a new product', () => {
    const newProduct = { name: 'Chair', price: 12 };
    expect(controller.createNewProduct(newProduct)).toStrictEqual(products[0]);
  });
  it('Should delete a product', () => {
    const productId = '123';
    expect(controller.removeProduct(productId)).toStrictEqual(products[0]);
  });
});
