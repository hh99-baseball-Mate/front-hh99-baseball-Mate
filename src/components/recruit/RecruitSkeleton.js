import React from 'react'
import { ArrowBack } from "../common"
import ContentLoader from 'react-content-loader'

const RecruitSkeleton = () => (
	<React.Fragment>

		<ArrowBack>상세 페이지</ArrowBack>

		<ContentLoader speed="2"  viewBox="0 0 425 900" >
			<rect x="15" y="15" rx="2" ry="2" width="395" height="395" />
			<rect x="35" y="420" rx="4" ry="4" width="355" height="139" />
			<circle cx="50" cy="600" r="20" /> 
			<rect x="80" y="585" rx="5" ry="5" width="80" height="10" />
			<rect x="80" y="605" rx="5" ry="5" width="105" height="10" />
			<rect x="30" y="640" rx="5" ry="5" width="105" height="10" />
			<rect x="30" y="660" rx="5" ry="5" width="300" height="10" />
			<rect x="30" y="680" rx="5" ry="5" width="330" height="10" />
			<rect x="15" y="710" rx="5" ry="5" width="395" height="67" />
			<rect x="15" y="790" rx="5" ry="5" width="395" height="100" />
			{/* <circle cx="80" cy="850" r="50" />  */}
			{/* <circle cx="200" cy="850" r="50" />  */}
			{/* <circle cx="350" cy="850" r="50" />  */}
		</ContentLoader>

	</React.Fragment>

)


export default RecruitSkeleton