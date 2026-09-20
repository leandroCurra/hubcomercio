export interface Storefront {
	logoUrl: string;
	faviconUrl: string;
	heroImageUrl: string;
	primaryColor: string;
	secondaryColor: string;
	accentColor: string;
	backgroundColor: string;
	textColor: string;
	headingFontFamily: string;
	bodyFontFamily: string;
	contactEmail: string;
	contactPhone: string;
	addressLine1: string;
	city: string;
	province: string;
	postalCode: string;
	countryCode: string;
	allowPickup: boolean;
	allowDelivery: boolean;
	minimumOrderAmount: number;
	currencyCode: string;
}

export interface Product {
	id: string;
	name: string;
	color: string;
	price: number;
	special: number;
	category: string;
	image: string;
	hover?: string;
	images: string[];
	sizes: string[];
	sku?: string;
	description?: string;
	order?: number;
	composition?: string;
}

export interface CartItem {
	product: Product;
	size: string;
	quantity: number;
}
