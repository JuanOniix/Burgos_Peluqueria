"use client";

import Image from "next/image";
import { ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@/data/products";
import { useCart } from "@/lib/cart-context";
import { formatCOP } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <Card className="h-full gap-0 overflow-hidden border-border/70 py-0">
      <div className="relative aspect-square w-full">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover"
        />
      </div>
      <CardContent className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium tracking-wide text-primary uppercase">
          {product.category}
        </p>
        <h3 className="mt-1 font-heading text-lg font-medium text-foreground">
          {product.name}
        </h3>
        <p className="mt-1.5 flex-1 text-sm text-muted-foreground">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="font-heading text-base font-medium text-foreground">
            {formatCOP(product.price)}
          </span>
          <Button
            size="sm"
            className="rounded-full"
            onClick={() => addItem(product)}
          >
            <ShoppingBag className="size-4" />
            Agregar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
