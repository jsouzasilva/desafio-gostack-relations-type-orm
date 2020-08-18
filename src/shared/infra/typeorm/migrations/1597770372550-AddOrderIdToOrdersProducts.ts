import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddOrderIdToOrdersProducts1597770372550 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.addColumn('orders_products', new TableColumn({
        name:'order_id',
        type: 'uuid',
        isNullable: true,

      }));

      await queryRunner.createForeignKey(
        'orders_products',
        new TableForeignKey(
          {
            name: 'OrdersProductsOrders',
            columnNames: ['order_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'orders',
            onDelete: 'SET NULL',
          }
        )
      );

      await queryRunner.dropForeignKey('orders_products','OrdersProductsOrders');
      await queryRunner.dropColumn('orders_products','order_id');

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
