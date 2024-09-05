import axios from 'axios'

export const POST = async (request) => {
	const data = await request.json();
	const domain = data.domain;

	try {
		const params = new URLSearchParams();
		params.append('field', 'EmailAddress');
		params.append('value', data.email);
		const checkRes = await axios.post('https://www.contrib.com/signup/checkexist', params);
		
		if(checkRes.data.status==='1'){
			const params = new URLSearchParams();
			params.append('domain', domain);
			params.append('email', data.email);
			params.append('message', data.message);
			params.append('amount', data.amount);
			params.append('contact_by', data.contactBy);

			const saveOfferExisting = await axios.post('https://www.contrib.com/forms/save_offer_for_existing_account', params)
			
			if(saveOfferExisting.data.success){				
				const params = new URLSearchParams();
				
				params.append('firstname', data.firstName);
				params.append('email', data.email);
				params.append('domain', domain);
				params.append('template_name', 'Offer');
				
				const sendEmail = await axios.post('https://www.contrib.com/forms/autoresponderEmail', params);
				
				return new Response(JSON.stringify({status:true,offer:saveOfferExisting.data, email:sendEmail.data}), { status: 201 })
			}else{
				return new Response(JSON.stringify({status:false,result:saveOfferExisting.data.result}), { status: 201 });
			}
		}else{
			const params = new URLSearchParams();
			params.append('domain', data.domain);
			params.append('firstname', data.firstName);
			params.append('lastname', data.lastName);
			params.append('email', data.email);
			params.append('country_id', data.country_id);
			params.append('country', data.country);
			params.append('password', data.password);
			params.append('contact', data.phone);
			params.append('message', data.message);
			params.append('amount', data.amount);
			params.append('contact_by', data.contactBy);
			
			const saveOffer = await axios.post('https://www.contrib.com/forms/save_offer', params);
			
			if(saveOffer.data.success){
				
				const params = new URLSearchParams();
				
				params.append('firstname', data.firstName);
				params.append('email', data.email);
				params.append('domain', domain);
				params.append('template_name', 'Offer');
				
				const sendEmail = await axios.post('https://www.contrib.com/forms/autoresponderEmail', params);
				
				return new Response(JSON.stringify({status:true, offer:saveOffer.data, email:sendEmail.data}), { status: 201 })
			}else{
				
				return new Response(JSON.stringify({status:false,result:saveOffer.data.result,error:"Failed to save Offer"}), { status: 201 });
			}
		}

	} catch (error) {
			console.log('error',error)
			return new Response("An error occurred", { status: 500 });
	}
}