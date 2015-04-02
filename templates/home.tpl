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

				<!-- Title of the post. -->
				<h2>{{ row.title }}</h2>

				<div class="row">

					<!-- Published date. -->
					<!-- We can use Foundation's pull-* and push* classes to position the date based on the screen size. -->
					<div class="column small-4 small-push-3 medium-12 medium-push-0">
						Published:
					</div>

					<!-- Post's author (as a link to their profile). -->
					<div class="column small-3 small-pull-4 medium-pull-0">
						<a href="{{ getPhotosLink( row.link ) }}" target="_blank">Post author</a>
					</div>

					<!-- Link to the post. -->
					<div class="column small-3 end">
						<a ng-href="{{ row.link }}" target="_blank">View on Flickr</a>
					</div>
				</div>
			</div>

		</div>

	</div>

</div>