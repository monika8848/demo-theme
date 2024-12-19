import ReactPaginate from 'react-paginate';
import ProductCard from '../../../cards/ProductCard';
import ProductCardSkeleton from '../../../cards/ProductCardSkeleton';
import useAddToCartHook from '../../../hooks/CartPageHook/useAddToCart';
import paginationStyle from '../../../styles/components/pagination.module.scss';
import NoDataFound from '../../NoRecordFound';
import ProductCardVariantColour from '../../../cards/ProductCardVariantColour';
import ProductListViewCardVariantColour from '../../../cards/ProductListViewCardVariantColour';

function ProductListViewMaster({
  isLoading,
  productListingData,
  productListTotalCount,
  pageOffset,
  handlePageClick,
  wishlistData,
  isSuperAdmin,
  handleShowCatalogModal,
  handleDeleteCatalogItem,
  cartData,
}: any) {
  const isNextButtonDisabled: boolean = parseInt((productListTotalCount / 12).toString(), 10) === pageOffset;
  const { addToCartItem, getPartyName } = useAddToCartHook();
  const handleDataRendering = () => {
    if (isLoading) {
      return (
        <div className="row">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="col-6 col-md-4 col-lg-3 gap-2 p-0 p-md-2 text-center mb-4">
              <ProductCardSkeleton />
            </div>
          ))}
        </div>
      );
    }

    if (productListingData?.length > 0) {
      return (
        <>
          <div className="">
            {productListingData?.map((data: any, i: any) => {
              return (
                <div key={innerHeight * i} className="border">
                  <ProductListViewCardVariantColour
                    data={data}
                    addToCartItem={addToCartItem}
                    getPartyName={getPartyName}
                    wishlistData={wishlistData}
                    isSuperAdmin={isSuperAdmin}
                    handleDeleteCatalogItem={handleDeleteCatalogItem}
                    handleShowCatalogModal={handleShowCatalogModal}
                    cartData={cartData}
                  />
                </div>
              );
            })}
          </div>
          <ReactPaginate
            previousLabel={'Prev'}
            nextLabel={'Next'}
            pageCount={productListTotalCount / 12}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={`${paginationStyle.paginationBttns}`}
            previousLinkClassName={pageOffset === 0 ? 'd-none' : paginationStyle.previousBttn}
            disabledClassName={paginationStyle.paginationDisabled}
            nextLinkClassName={isNextButtonDisabled ? 'd-none' : `${paginationStyle.nextBttn}`}
            activeClassName={`${paginationStyle.paginationActive}`}
            forcePage={pageOffset}
          />
        </>
      );
    }

    if (productListingData?.length === 0) {
      return <NoDataFound title="No Record Found !!" message="We couldn't find what you searched for. Try searching again." />;
    }
  };
  return <>{handleDataRendering()}</>;
}

export default ProductListViewMaster;
