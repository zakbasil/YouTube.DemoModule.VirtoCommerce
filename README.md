# YouTube.DemoModule.VirtoCommerce
Youtube demo video catalog with Virto Commerce Platform


////////////////////////////////////////////////////////////////////////
Task Status

Implement API Operations
	Create/Update 	: Done
	Delete 		: Done
	Search		: Done

Misc
	With Pagination 			: Done
	Add Cache for Read and Search operation	: Pending
	Trigger Custom Event – New Video Added	: Done

Implement Admin UI
	YouTube Video – CSS fab fa-youtube			: Done
	List of Youtube videos with Pagination and Search	: Done
	Add a New Youtube Video					: Done
	(Optional) YouTube Video Validation			: Pending

//////////////////////////////////////////////////////////////////////////

Changes Made to Scripts in Customer Review sample module (Taken latest from vc-platform/modules)

API EndPoint
	1. $resources, added params and data

Blade
	1. Added 2 controllers
	2. Added 2 blades
	3. Edited Toolbarcommands
	4. Added methods to process Add/Delete/Search response.
//////////////////////////////////////////////////////////////////////////

Adding Migration

Execute this in Package manager console. (The YouTubeVideo table of DB is bit different for me)

Add-Migration Initial -Context VirtoCommerce.Platform.Data.Repositories.YouTubeDemoModuleDbContext  -Verbose -OutputDir Migrations -Project VirtoCommerce.Platform.Data  -Debug


//////////////////////////////////////////////////////////////////////////
Steps to Build and Run

1. Open the solution in VS
2. Build the solution with YouTube.DemoModule.Web module as startup project
3. Open Command prompt (Run as Admin), Change Directory to the vc-platform/modules
4. Execute: mklink /d Youtube.DemoModule C:/path-to-youtube-module/YouTube.DemoModule.Web
5. Open Nodejs Command prompt (Run as Admin), Change Directory to the YouTube.DemoModule.Web module
6. Execute: npm install
7. Execute: npm run webpack:dev
8. Open https://localhost:5001/
