<div class="home">

	<h1>what's on fleek</h1>

	<!-- No results..? -->
	<div class="" ng-show="model.data.length === 0">Nothing is on fleek today.</div>

	<!-- Results from Flickr... -->
	<div class="results">

		<!--
			Each result will require:
			- the photo ID
			- the image itself
			- the title
			- the published date (formatted using moment.js)
			- a link to the photo author's page on Flickr
			- a link to the photo's page on Flickr.
		-->
		<div class="row" ng-repeat="row in model.data.items track by $index">
			<!-- Photo on the left... -->
			<div class="column small-4 medium-3">
				<img ng-src="{{ row.media.m }}" alt="{{ row.title }} by {{ row.author }}">
			</div>

			<!-- Details on the right. -->
			<div class="column small-8 medium-9">

				<!-- Title of the post (links to more info). -->
				<h2>
					<a ng-click="showInfo( $index )" ng-bind-html="getTitle(row.title)"></a>
				</h2>

				<div class="row">

					<!-- Published date. -->
					<!-- We can use Foundation's pull-* and push* classes to position the date based on the screen size. -->
					<div class="column medium-6 medium-push-3">
						Published: {{ getDate( row.published ) }}
					</div>

					<!-- Post's author (as a link to their profile). -->
					<div class="column small-3 medium-pull-6">
						<a ng-href="{{ getUserURL( row.author_id ) }}" target="_blank">Post author</a>
					</div>

					<!-- Link to the post. -->
					<div class="column small-3 end">
						<a ng-href="{{ row.link }}" target="_blank">View on Flickr</a>
					</div>
				</div>
			</div>

		</div>

	</div>


	<!--
		Modal window to display details of a single post.
		Along with the information already fetched, we want to display:
		- the photo's description
		- any associated tags
	-->
	<div id="fleek-info" class="reveal-modal" data-reveal aria-hidden="true" role="dialog">

		<div class="loading" ng-show="model.post === 'loading'">loading...</div>

		<div ng-show="model.post !== 'loading'">
			<!-- Heading. -->
			<header class="row">
				<div class="column medium-9">
					<h2 ng-bind-html="getTitle( model.post.title )"></h2>

					<!-- Post author. -->
					<span class="author">
						<a ng-href="{{ getPhotosLink( row.link ) }}" target="_blank">Photo author</a>
					</span>
					|
					<span class="published">
						Published: {{ getDate( model.post.published ) }}
					</span>
				</div>
			</header>

			<div class="row">
				<div class="column medium-2">
					<img ng-src="{{ model.post.media.m }}" alt="{{ model.post.title }} by {{ model.post.author }}">
				</div>
				<div class="column medium-10">
					<p ng-bind-html="getDescription( model.post.description )"></p>
					<ul class="tags inline-list">
						<li ng-repeat="tag in model.post.tags">
							<a>{{ tag }}</a>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<!-- Back (close) button. -->
		<a class="close-reveal-modal" aria-label="Close">Back</a>
	</div>

</div>
