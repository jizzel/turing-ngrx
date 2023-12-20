import {Component, OnInit} from '@angular/core';
import {Product} from '../product';
import {Store} from '@ngrx/store';
import {getCurrentProduct, getError, getProducts, getShowProductCode, State} from '../state';
import {Observable} from 'rxjs';
import {ProductPageActions} from '../state/actions';

@Component({
    templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit {
    products$: Observable<Product[]>;
    selectedProduct$: Observable<Product>;
    displayCode$: Observable<boolean>;
    errorMessage$: Observable<string>;

    constructor(private store: Store<State>) {
    }

    ngOnInit(): void {
        this.products$ = this.store.select(getProducts);
        this.errorMessage$ = this.store.select(getError);
        this.store.dispatch(ProductPageActions.loadProducts());
        this.selectedProduct$ = this.store.select(getCurrentProduct);
        this.displayCode$ = this.store.select(getShowProductCode);
    }

    checkChanged(): void {
        this.store.dispatch(ProductPageActions.toggleProductCode());
    }

    newProduct(): void {
        this.store.dispatch(ProductPageActions.initializeCurrentProduct());
    }

    productSelected(product: Product): void {
        this.store.dispatch(ProductPageActions.setCurrentProduct(
            {currentProductId: product.id}
        ));
    }

    deleteProduct(product: Product): void {
        this.store.dispatch(ProductPageActions.deleteProduct({ productId: product.id }));
    }

    clearProduct(): void {
        this.store.dispatch(ProductPageActions.clearCurrentProduct());
    }
    saveProduct(product: Product): void {
        this.store.dispatch(ProductPageActions.createProduct({ product }));
    }

    updateProduct(product: Product): void {
        this.store.dispatch(ProductPageActions.updateProduct({ product }));
    }

}
