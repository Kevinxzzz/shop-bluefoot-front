import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from '@/services/productService';
import { queryKeys } from '@/lib/react-query/queryKeys';
import type { CreateProductDTO } from '@/types/productType';
import type { ApiError } from '@/services/httpClient';

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation<any, ApiError, CreateProductDTO>({
    mutationFn: (data: CreateProductDTO) => productService.createProduct(data),
    onSuccess: () => {
      // Invalida o cache da lista de produtos para forçar uma nova requisição
      queryClient.invalidateQueries({ queryKey: queryKeys.products.lists() });
    },
  });
}
