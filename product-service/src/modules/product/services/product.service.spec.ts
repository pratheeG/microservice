import { Test, TestingModule } from '@nestjs/testing';

import { CreateProductDto } from '../dto/product.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Product } from 'src/models/product.interface';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  const mockPrismaService = {
    product: {
      findMany: jest.fn().mockImplementation((params) => {
        if (params.take === 2) {
          return [
            { id: 123, name: 'Chair', price: 12 },
            { id: 1232, name: 'Table', price: 122 },
          ];
        }
        return [{ id: 123, name: 'Chair', price: 12 }];
      }),
      findFirst: jest.fn().mockImplementation((params) => {
        if (params.where.id === 123) {
          return { id: 123, name: 'Chair', price: 12 };
        }
        return null;
      }),
      create: jest.fn().mockReturnValue({
        id: 123,
        name: 'Chair',
        price: 12,
      }),
      delete: jest.fn().mockReturnValue({
        id: 123,
        name: 'Locker',
        price: 12,
        type: 'GAMING',
      }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should get only latest two products', async () => {
    const expectedProducts = [
      { id: 123, name: 'Chair', price: 12 },
      { id: 1232, name: 'Table', price: 122 },
    ];
    const products = await service.getAllProducts('', 1, 2);
    expect(products.length).toBe(2);
    expect(products).toStrictEqual(expectedProducts);
  });

  it('Should get only latest one products', async () => {
    const expectedProducts = [{ id: 123, name: 'Chair', price: 12 }];
    const products = await service.getAllProducts('', 1, 1);
    expect(products.length).toBe(1);
    expect(products).toStrictEqual(expectedProducts);
  });

  it('Should get product by id', async () => {
    const expectedProduct: Product = { id: 123, name: 'Chair', price: 12 };
    const product = await service.getProductDetails(expectedProduct.id);
    expect(product).toStrictEqual(expectedProduct);
  });

  it('Should throw error when the id not found in the list', async () => {
    const expectedProduct: Product = { id: 124, name: 'Chair', price: 12 };
    try {
      await service.getProductDetails(expectedProduct.id);
    } catch (error) {
      expect(error.message).toBe('No product found with id 124');
    }
  });

  it('Should create a new product', async () => {
    const newProduct: CreateProductDto = { name: 'Chair', price: 12 };
    const expectedCreatedProduct: Product = { ...newProduct, id: 123 };
    const createdProduct = await service.createNewProduct(newProduct);
    expect(createdProduct).toStrictEqual(expectedCreatedProduct);
  });

  it('Should delete a product', async () => {
    const productId = 123;
    const expectedDeletedProduct = {
      id: 123,
      name: 'Locker',
      price: 12,
      type: 'GAMING',
    };
    const deletedProduct = await service.deleteProduct(productId);
    expect(deletedProduct).toStrictEqual(expectedDeletedProduct);
  });
});
