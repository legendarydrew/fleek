<div class="home">

	<h1>what's on fleek</h1>

	<!-- No results..? -->
	<div class="" ng-show="model.data.length === 0">Nothing is on fleek today.</div>

	<!-- Results from Flickr... -->
	<div class="results">

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
					<div class="column small-4 small-push-3 medium-12 medium-push-0">
						Published: {{ row.published }}
					</div>

					<!-- Post's author (as a link to their profile). -->
					<div class="column small-3 small-pull-4 medium-pull-0">
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


	<!-- Modal window to display details of a single post. -->
	<div id="fleek-info" class="reveal-modal" data-reveal aria-hidden="true" role="dialog">

		<div class="loading" ng-show="model.post === 'loading'">loading...</div>

		<div ng-show="model.post !== 'loading'">
			<!-- Heading. -->
			<header class="row">
				<div class="column medium-9">
					<h2 ng-bind-html="getTitle( model.post.title._content )"></h2>

					<!-- Post author. -->
					<span class="author">
						<a target="_blank">{{ model.post.owner.username }}</a>
						<!-- <a ng-href="{{ getPhotosLink( row.link ) }}" target="_blank">Post author</a> -->
					</span>
					|
					<span class="published">
						Published: {{ model.post.dates.taken }}
					</span>
				</div>
			</header>

			<div class="row">
				<div class="column medium-2">
					<!-- image -->
				</div>
				<div class="column medium-10">
					<p>{{ model.post.description._content || "no description" }}</p>
					<ul class="tags">
						<li ng-repeat="tag in model.post.tags">
							{{ tag._content }}
						</li>
					</ul>
				</div>
			</div>
		</div>

		<!-- Back (close) button. -->
		<a class="close-reveal-modal" aria-label="Close">Back</a>
	</div>

</div>
